# demo-002 acceptance check

Date: 2026-10-09
Raw log: jobs/demo-002/qa/logs/acceptance-ffprobe.log
Tool: `npx remotion ffprobe` ran successfully (exit 0) for every call, so the system ffprobe fallback was not used. The decode check used `ffmpeg` (exit 0, empty stderr).

## Commands (run from repo root, per file)
1. `npx remotion ffprobe -v error -show_streams -show_format -of json <file>`
2. `npx remotion ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of json <file>`
3. `ffmpeg -v error -i <file> -f null -` (stderr recorded; empty = clean decode)

## Results

### jobs/demo-002/out/demo-002-16x9.mp4

| # | Item | Expected | Measured | Result |
|---|------|----------|----------|--------|
| 1 | width x height | 1920x1080 | 1920x1080 | PASS |
| 2 | r_frame_rate / avg_frame_rate | 30/1 | 30/1 / 30/1 | PASS |
| 3 | nb_read_frames | 450 | 450 | PASS |
| 4 | video codec_name | h264 | h264 | PASS |
| 5 | pix_fmt | yuv420p | yuv420p | PASS |
| 6 | audio stream codec_name | aac | aac (stream index 1) | PASS |
| 7a | video stream duration | 15.000 s +/- 0.0334 | 15.000000 s (diff 0.000) | PASS |
| 7b | audio stream duration | 15.000 s +/- 0.0334 | 15.019000 s (diff 0.019) | PASS |
| 7c | container duration | 15.000 s +/- 0.0334 | 15.019000 s (diff 0.019) | PASS |
| 8 | decodes cleanly | empty ffmpeg stderr | empty stderr, exit 0 | PASS |

### jobs/demo-002/out/demo-002-9x16.mp4

| # | Item | Expected | Measured | Result |
|---|------|----------|----------|--------|
| 1 | width x height | 1080x1920 | 1080x1920 | PASS |
| 2 | r_frame_rate / avg_frame_rate | 30/1 | 30/1 / 30/1 | PASS |
| 3 | nb_read_frames | 450 | 450 | PASS |
| 4 | video codec_name | h264 | h264 | PASS |
| 5 | pix_fmt | yuv420p | yuv420p | PASS |
| 6 | audio stream codec_name | aac | aac (stream index 1) | PASS |
| 7a | video stream duration | 15.000 s +/- 0.0334 | 15.000000 s (diff 0.000) | PASS |
| 7b | audio stream duration | 15.000 s +/- 0.0334 | 15.019000 s (diff 0.019) | PASS |
| 7c | container duration | 15.000 s +/- 0.0334 | 15.019000 s (diff 0.019) | PASS |
| 8 | decodes cleanly | empty ffmpeg stderr | empty stderr, exit 0 | PASS |

## Summary
Both files: all 8 items PASS. Note: audio and container duration are 15.019 s, which is 0.019 s over the 15.000 s nominal and inside the 0.0334 s tolerance.
Playback was not reviewed. This check covers container and stream metadata and decode only, not visual or audio content.
