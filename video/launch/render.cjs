// Rendu image par image de index.html via window.seek(t), puis encodage MP4.
// Usage :
//   node render.cjs stills <w> <h> <outDir> <t1,t2,...>
//   node render.cjs video  <w> <h> <out.mp4> [fps]
// Playwright est résolu depuis PLAYWRIGHT_DIR ou depuis le module global.
const path = require('path');
const { spawn, execSync } = require('child_process');
const pwDir = process.env.PLAYWRIGHT_DIR || path.join(execSync('npm root -g').toString().trim(), 'playwright');
const { chromium } = require(pwDir);

const [mode, w, h, out, extra] = process.argv.slice(2);
const W = +w, H = +h;
const url = 'file://' + path.join(__dirname, 'index.html') + `?render&w=${W}&h=${H}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await page.goto(url);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
  const shot = async t => { await page.evaluate(t => window.seek(t), t); return page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } }); };

  if (mode === 'stills') {
    const fs = require('fs'); fs.mkdirSync(out, { recursive: true });
    for (const t of extra.split(',').map(Number)) fs.writeFileSync(path.join(out, `t${t.toFixed(2).padStart(5, '0')}.png`), await shot(t));
  } else {
    const fps = +(extra || 30), dur = await page.evaluate(() => window.DURATION), n = Math.round(dur * fps);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error',
      '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
      '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
      '-shortest', '-map', '0:v', '-map', '1:a',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p',
      '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
      '-vf', 'scale=out_range=tv:out_color_matrix=bt709',
      '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < n; i++) {
      const buf = await shot(i / fps);
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 150 === 0) process.stdout.write(`frame ${i}/${n}\n`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
