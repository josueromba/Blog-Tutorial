# Revisions - demo-001
## Round 1 (2026-10-09), decided by main
First render self-checks, confirmed by main with ffprobe on 16x9:
- pix_fmt = yuvj420p (the brief requires yuv420p).
- Audio start_time 0 with no priming trim: about 43 ms lag, so hits land about 1 frame late.
- Audio stream 15.061 s, outside ±1 frame of 15.000 s.

Fixes: add --color-space=bt709; compensate the audio offset at the source and bring the audio duration to within 33 ms of 15.000 s.
