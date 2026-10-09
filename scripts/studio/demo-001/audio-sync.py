"""Per-cut audio sync of a rendered MP4 against score.wav (decoded via ffmpeg).
Usage: python3 -I scripts/studio/demo-001/audio-sync.py <file.mp4> <score.wav>"""
import subprocess, sys
import numpy as np
CUTS = [0, 75, 165, 255, 330, 390]
SPF = 1600
def pcm(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-vn', '-ac', '1', '-ar', '48000', '-f', 's16le', '-'],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float64)
mp4, wav = pcm(sys.argv[1]), pcm(sys.argv[2])
print(f'file: {sys.argv[1]}')
print(f'decoded audio samples: {len(mp4)} ({len(mp4)/48000:.4f} s); wav {len(wav)} ({len(wav)/48000:.4f} s)')
for c in CUTS:
    t0 = c * SPF
    a, b = max(0, t0 - 400), t0 + 4800          # reference window around the transient
    ref = wav[a:b]
    best = (0, -2.0)
    for lag in range(-3200, 3201):
        lo, hi = a + lag, b + lag
        if lo < 0 or hi > len(mp4):
            continue
        seg = mp4[lo:hi]
        n = np.linalg.norm(ref) * np.linalg.norm(seg)
        if n == 0:
            continue
        r = float(np.dot(ref, seg) / n)
        if r > best[1]:
            best = (lag, r)
    # frame (1/30 s window) holding the loudest sample within +-3 frames of the cut
    lo = max(0, t0 - 3 * SPF); hi = min(len(mp4), t0 + 4 * SPF)
    pk = lo + int(np.argmax(np.abs(mp4[lo:hi])))
    print(f'cut f{c:<3d} lag {best[0]:+5d} samples ({best[0]/SPF:+.2f} frames, corr {best[1]:.3f}); '
          f'peak sample in frame f{pk // SPF} ({20*np.log10(abs(mp4[pk])/32768):.2f} dBFS)')
