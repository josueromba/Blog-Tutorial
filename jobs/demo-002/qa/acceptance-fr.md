# demo-002 FR acceptance check

Date: 2026-10-09
Raw log: `jobs/demo-002/qa/logs/acceptance-fr-ffprobe.log`
Tool: `npx remotion ffprobe` succeeded for every call (exit 0). No fallback to system ffprobe was needed. `ffmpeg -v error -i <file> -f null -` exited 0 with empty stderr for both files.

Commands (run from repo root, for each file):
- `npx remotion ffprobe -v error -show_streams -show_format -of json <file>`
- `npx remotion ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of json <file>`
- `ffmpeg -v error -i <file> -f null -`

Duration tolerance: 0.0334 s around 15.000 s (allowed range 14.9666 to 15.0334 s).

## File 1: jobs/demo-002/out/demo-002-fr-16x9.mp4

| # | Item | Expected | Measured | Result |
|---|------|----------|----------|--------|
| 1 | width x height | 1920x1080 | 1920x1080 | PASS |
| 2 | r_frame_rate / avg_frame_rate | 30/1 | r_frame_rate 30/1, avg_frame_rate 30/1 | PASS |
| 3 | nb_read_frames (video) | 450 | 450 | PASS |
| 4 | video codec_name | h264 | h264 | PASS |
| 5 | pix_fmt | yuv420p | yuv420p | PASS |
| 6 | audio stream codec_name | aac | aac (stream 1, 2 ch, 48000 Hz) | PASS |
| 7a | video stream duration | 15.000 +/- 0.0334 | 15.000000 s | PASS |
| 7b | audio stream duration | 15.000 +/- 0.0334 | 15.019000 s (diff +0.019 s) | PASS |
| 7c | container duration | 15.000 +/- 0.0334 | 15.019000 s (diff +0.019 s) | PASS |
| 8 | decodes cleanly | empty ffmpeg stderr | empty stderr, exit 0 | PASS |

## File 2: jobs/demo-002/out/demo-002-fr-9x16.mp4

| # | Item | Expected | Measured | Result |
|---|------|----------|----------|--------|
| 1 | width x height | 1080x1920 | 1080x1920 | PASS |
| 2 | r_frame_rate / avg_frame_rate | 30/1 | r_frame_rate 30/1, avg_frame_rate 30/1 | PASS |
| 3 | nb_read_frames (video) | 450 | 450 | PASS |
| 4 | video codec_name | h264 | h264 | PASS |
| 5 | pix_fmt | yuv420p | yuv420p | PASS |
| 6 | audio stream codec_name | aac | aac (stream 1, 2 ch, 48000 Hz) | PASS |
| 7a | video stream duration | 15.000 +/- 0.0334 | 15.000000 s | PASS |
| 7b | audio stream duration | 15.000 +/- 0.0334 | 15.019000 s (diff +0.019 s) | PASS |
| 7c | container duration | 15.000 +/- 0.0334 | 15.019000 s (diff +0.019 s) | PASS |
| 8 | decodes cleanly | empty ffmpeg stderr | empty stderr, exit 0 | PASS |

## Overall

Both files PASS all 8 items on the measured values above. Scope is the container and stream checks and decode check only. Playback and visual or audio content were not reviewed, so this is not a render-quality acceptance.
