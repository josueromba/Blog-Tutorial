// Deterministic original score for jobs/demo-002 (copy of the demo-001 synth, demo-002 timing).
// Run:  node scripts/studio/demo-002/synth-score.mts [outPath]
// Default out: public/studio/demo-002/score.wav
// No samples, no network, no Math.random(): all noise comes from a seeded PRNG.

import {writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {CUTS, CUES, FPS, TOTAL_FRAMES} from '../../../src/studio/demo-002/timing.ts';

const SR = 48000;
const SPF = SR / FPS; // 1600 samples per frame
const N = TOTAL_FRAMES * SPF; // 720000 samples = 15.000 s
const SEED = 20261008;

const outPath = resolve(process.argv[2] ?? 'public/studio/demo-002/score.wav');

// ---------- PRNG ----------
const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const rand = mulberry32(SEED);
const noise = () => rand() * 2 - 1;

// ---------- buffers ----------
const L = new Float64Array(N);
const R = new Float64Array(N);
const add = (i: number, l: number, r: number) => {
  if (i >= 0 && i < N) {
    L[i] += l;
    R[i] += r;
  }
};
const lpCoef = (fc: number) => 1 - Math.exp((-2 * Math.PI * fc) / SR);
const f2s = (frame: number) => Math.round(frame * SPF);

// ---------- hits on cuts ----------
const hit = (frame: number, gain: number) => {
  const t0 = f2s(frame);
  // Kick: 1 ms attack so the peak lands exactly on t0.
  const attack = frame === 0 ? 0 : 48;
  let phase = 0;
  const len = Math.round(0.45 * SR);
  for (let k = -attack; k < len; k++) {
    const t = Math.max(0, k) / SR;
    const freq = 48 + 112 * Math.exp(-t / 0.03);
    phase += (2 * Math.PI * freq) / SR;
    const env = k < 0 ? (k + attack) / attack : Math.exp(-t / 0.11);
    const s = Math.sin(phase) * env * 0.85 * gain;
    add(t0 + k, s, s);
  }
  // Click: 3 ms noise burst at t0.
  for (let k = 0; k < Math.round(0.003 * SR); k++) {
    const env = 1 - k / (0.003 * SR);
    const s = noise() * env * 0.35 * gain;
    add(t0 + k, s, s);
  }
  // Snap: band-passed noise, 60 ms.
  let lp1 = 0;
  let lp2 = 0;
  const aHi = lpCoef(5200);
  const aLo = lpCoef(1400);
  for (let k = 0; k < Math.round(0.12 * SR); k++) {
    const t = k / SR;
    const n = noise();
    lp1 += aHi * (n - lp1);
    lp2 += aLo * (lp1 - lp2);
    const bp = lp1 - lp2;
    const env = Math.exp(-t / 0.03);
    add(t0 + k, bp * env * 0.55 * gain, bp * env * 0.5 * gain);
  }
};

// Riser: 8 frames of filtered noise, swelling, ending exactly at the cut.
const riser = (frame: number) => {
  const t1 = f2s(frame);
  const len = 8 * SPF;
  let yl = 0;
  let yr = 0;
  for (let k = 0; k < len; k++) {
    const p = k / len;
    const a = lpCoef(400 + 6000 * p * p);
    yl += a * (noise() - yl);
    yr += a * (noise() - yr);
    const env = Math.pow(p, 2.2) * 0.28;
    add(t1 - len + k, yl * env, yr * env);
  }
};

// ---------- micro cues ----------
const blip = (frame: number, freq: number, amp: number, tau: number) => {
  const t0 = f2s(frame);
  for (let k = 0; k < Math.round(tau * 6 * SR); k++) {
    const t = k / SR;
    const s = Math.sin(2 * Math.PI * freq * t) * Math.exp(-t / tau) * amp * Math.min(1, k / 24);
    add(t0 + k, s, s);
  }
};
const tick = (frame: number, amp: number) => {
  const t0 = f2s(frame);
  let prev = 0;
  for (let k = 0; k < Math.round(0.012 * SR); k++) {
    const n = noise();
    const hp = n - prev; // crude high-pass
    prev = n;
    const s = hp * Math.exp(-k / (0.003 * SR)) * amp;
    add(t0 + k, s, s * 0.9);
  }
};
const bell = (frame: number, freq: number, amp: number) => {
  const t0 = f2s(frame);
  for (let k = 0; k < Math.round(1.0 * SR); k++) {
    const t = k / SR;
    const env = Math.exp(-t / 0.22) * Math.min(1, k / 48);
    const s =
      (Math.sin(2 * Math.PI * freq * t) + 0.25 * Math.sin(2 * Math.PI * freq * 2.01 * t)) * env * amp;
    add(t0 + k, s * 0.9, s);
  }
};
const swish = (fromFrame: number, toFrame: number, amp: number) => {
  const a0 = f2s(fromFrame);
  const len = f2s(toFrame) - a0;
  let lp1 = 0;
  let lp2 = 0;
  for (let k = 0; k < len; k++) {
    const p = k / len;
    const n = noise();
    lp1 += lpCoef(600 + 5000 * p) * (n - lp1);
    lp2 += lpCoef(300 + 1500 * p) * (lp1 - lp2);
    const env = Math.sin(Math.PI * p) * amp;
    const pan = p; // sweep left -> right
    add(a0 + k, (lp1 - lp2) * env * (1 - pan * 0.6), (lp1 - lp2) * env * (0.4 + pan * 0.6));
  }
};

// ---------- bed ----------
const midi = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
// Chords per scene (one bar each): Am, F, C, G, Am, F, then C resolve on the end card
const CHORDS = [
  [57, 60, 64],
  [53, 57, 60],
  [55, 60, 64],
  [55, 59, 62],
  [57, 60, 64],
  [53, 57, 60],
  [48, 55, 60, 64],
];
const ROOTS = [45, 41, 48, 43, 45, 41, 36];
const END_CUT = CUTS[CUTS.length - 2]; // 360: end card
const sceneAt = (i: number) => {
  for (let s = CUTS.length - 2; s >= 0; s--) if (i >= f2s(CUTS[s])) return s;
  return 0;
};

const bed = () => {
  const voices = 4;
  const phL = new Float64Array(voices);
  const phR = new Float64Array(voices);
  let yl = 0;
  let yr = 0;
  const a = lpCoef(850);
  const endFrame = END_CUT; // pad releases into the end card
  const beat = SR / 2; // 120 BPM
  let bassPh = 0;
  for (let i = 0; i < N; i++) {
    const s = sceneAt(i);
    const chord = CHORDS[s];
    let l = 0;
    let r = 0;
    for (let v = 0; v < voices; v++) {
      const note = chord[v % chord.length] + (v >= chord.length ? 12 : 0);
      const f = midi(note);
      phL[v] = (phL[v] + (f * Math.pow(2, -6 / 1200)) / SR) % 1;
      phR[v] = (phR[v] + (f * Math.pow(2, 6 / 1200)) / SR) % 1;
      l += 2 * phL[v] - 1;
      r += 2 * phR[v] - 1;
    }
    yl += a * (l / voices - yl);
    yr += a * (r / voices - yr);
    // Bass pulse on each beat
    const tb = (i % beat) / SR;
    bassPh += (2 * Math.PI * midi(ROOTS[s])) / SR;
    const bass = Math.sin(bassPh) * Math.exp(-tb / 0.18) * Math.min(1, (i % beat) / 96) * 0.16;
    // Envelope: 2-frame fade-in, release after 390 to silence by ~444
    let env = Math.min(1, i / (2 * SPF));
    const rel = f2s(endFrame);
    if (i >= rel) env *= Math.max(0, 1 - (i - rel) / (80 * SPF)) ** 2;
    // Sidechain duck after each cut
    let duck = 1;
    for (let c = 0; c < CUTS.length - 1; c++) {
      const d = i - f2s(CUTS[c]);
      if (d >= 0 && d < SR) duck = Math.min(duck, 1 - 0.5 * Math.exp(-d / SR / 0.15));
    }
    const g = env * duck;
    const bassG = i >= rel ? 0 : g;
    add(i, yl * 0.16 * g + bass * bassG, yr * 0.16 * g + bass * bassG);
  }
  // Off-beat hats (8ths between beats) until the end card
  for (let t = beat / 2; t < f2s(endFrame); t += beat) {
    let prev = 0;
    for (let k = 0; k < Math.round(0.03 * SR); k++) {
      const n = noise();
      const hp = n - prev;
      prev = n;
      const s = hp * Math.exp(-k / (0.008 * SR)) * 0.05;
      add(Math.round(t) + k, s * 0.8, s);
    }
  }
};

// ---------- end card resolve chord ----------
const resolveChord = (frame: number) => {
  const t0 = f2s(frame);
  const notes = [60, 64, 67, 74]; // C E G D (add9)
  const end = f2s(444);
  for (let k = 0; t0 + k < end; k++) {
    const t = k / SR;
    let s = 0;
    for (const m of notes) s += Math.sin(2 * Math.PI * midi(m) * t) + 0.3 * Math.sin(2 * Math.PI * midi(m + 12) * t);
    const fadeOut = Math.min(1, (end - (t0 + k)) / (10 * SPF));
    const env = Math.exp(-t / 0.55) * Math.min(1, k / 240) * fadeOut;
    add(t0 + k, s * env * 0.06, s * env * 0.065);
  }
};

// ---------- assemble ----------
bed();
for (let c = 0; c < CUTS.length - 1; c++) {
  const f = CUTS[c];
  if (f > 0) riser(f);
  hit(f, f === END_CUT ? 1.26 : 1.0);
}
resolveChord(END_CUT);
// micro cues (frames from src/studio/demo-002/timing.ts)
tick(CUES.lockClick, 0.22);
blip(CUES.lockClick, 1320, 0.07, 0.03);
blip(CUES.refreshTick, 990, 0.1, 0.04);
blip(CUES.refreshTick + 3, 1320, 0.08, 0.04);
tick(CUES.click, 0.25);
blip(CUES.click, 1760, 0.06, 0.02);
swish(CUES.swish[0], CUES.swish[1], 0.2);
for (const f of CUES.keyTaps) tick(f, 0.12);
blip(CUES.chipPop, 880, 0.12, 0.05);
{
  // preview pop: pitch drop 900 -> 500 Hz
  const t0 = f2s(CUES.previewPop);
  let ph = 0;
  for (let k = 0; k < Math.round(0.15 * SR); k++) {
    const t = k / SR;
    ph += (2 * Math.PI * (500 + 400 * Math.exp(-t / 0.02))) / SR;
    const s = Math.sin(ph) * Math.exp(-t / 0.04) * 0.16 * Math.min(1, k / 24);
    add(t0 + k, s, s);
  }
}
tick(CUES.dragTick, 0.18);
bell(CUES.downloadPop, midi(84), 0.09);
bell(CUES.downloadPop + 3, midi(91), 0.08);
CUES.rowTicks.forEach((f, idx) => blip(f, [740, 990][idx % 2], 0.1, 0.04));

// Force the final 4 frames to digital silence (the stream still spans 15.000 s).
for (let i = f2s(446); i < N; i++) {
  L[i] = 0;
  R[i] = 0;
}

// ---------- normalise to -1 dBFS and write ----------
let peak = 0;
for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const target = Math.pow(10, -1 / 20);
const gain = target / peak;

const data = Buffer.alloc(N * 4);
let clipped = 0;
let sumSq = 0;
for (let i = 0; i < N; i++) {
  const l = L[i] * gain;
  const r = R[i] * gain;
  sumSq += l * l + r * r;
  const ql = Math.round(l * 32767);
  const qr = Math.round(r * 32767);
  if (Math.abs(ql) >= 32767 || Math.abs(qr) >= 32767) clipped++;
  data.writeInt16LE(Math.max(-32768, Math.min(32767, ql)), i * 4);
  data.writeInt16LE(Math.max(-32768, Math.min(32767, qr)), i * 4 + 2);
}
if (clipped > 0) throw new Error(`Clipping detected: ${clipped} samples`);

const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + data.length, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(2, 22); // stereo
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(data.length, 40);

mkdirSync(dirname(outPath), {recursive: true});
writeFileSync(outPath, Buffer.concat([header, data]));

const rms = Math.sqrt(sumSq / (2 * N));
console.log(
  JSON.stringify({
    out: outPath,
    sampleRate: SR,
    samplesPerChannel: N,
    seconds: N / SR,
    seed: SEED,
    hitsAtFrames: CUTS.slice(0, -1),
    hitSamples: CUTS.slice(0, -1).map(f2s),
    peakDbfs: +(20 * Math.log10(target)).toFixed(2),
    rmsDbfs: +(20 * Math.log10(rms)).toFixed(2),
    clippedSamples: clipped,
  }),
);
