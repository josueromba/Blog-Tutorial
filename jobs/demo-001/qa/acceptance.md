# demo-001 acceptance check

- Date: 2026-10-09
- Scope: `jobs/demo-001/out/demo-001-16x9.mp4` (expected 1920x1080) and `jobs/demo-001/out/demo-001-9x16.mp4` (expected 1080x1920)
- Tool: `npx remotion ffprobe` ran successfully (exit 0) for every probe, so the system ffprobe was not used.
- Raw log: `jobs/demo-001/qa/logs/acceptance-ffprobe.log`

## Commands (run from repo root, for each file)

1. `npx remotion ffprobe -v error -show_streams -show_format -of json <file>`
2. `npx remotion ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of json <file>`
3. `ffmpeg -v error -i <file> -f null -` (stderr recorded; empty means clean decode)

Duration tolerance: 1 frame at 30 fps = 0.0334 s around 15.000 s.

## Results

### demo-001-16x9.mp4

| # | Item | Expected | Measured | Result |
|---|------|----------|----------|--------|
| 1 | width x height | 1920x1080 | 1920x1080 | PASS |
| 2 | r_frame_rate / avg_frame_rate | 30/1 | 30/1 / 30/1 | PASS |
| 3 | nb_read_frames (v:0) | 450 | 450 | PASS |
| 4 | video codec_name | h264 | h264 | PASS |
| 5 | pix_fmt | yuv420p | yuv420p | PASS |
| 6 | audio stream present, codec_name | aac | aac (stream present) | PASS |
| 7a | duration, video stream | 15.000 s +/- 0.0334 | 15.000000 s (diff 0.000) | PASS |
| 7b | duration, audio stream | 15.000 s +/- 0.0334 | 15.019000 s (diff 0.019) | PASS |
| 7c | duration, format/container | 15.000 s +/- 0.0334 | 15.019000 s (diff 0.019) | PASS |
| 8 | full decode, ffmpeg stderr | empty | empty (exit 0) | PASS |

### demo-001-9x16.mp4

| # | Item | Expected | Measured | Result |
|---|------|----------|----------|--------|
| 1 | width x height | 1080x1920 | 1080x1920 | PASS |
| 2 | r_frame_rate / avg_frame_rate | 30/1 | 30/1 / 30/1 | PASS |
| 3 | nb_read_frames (v:0) | 450 | 450 | PASS |
| 4 | video codec_name | h264 | h264 | PASS |
| 5 | pix_fmt | yuv420p | yuv420p | PASS |
| 6 | audio stream present, codec_name | aac | aac (stream present) | PASS |
| 7a | duration, video stream | 15.000 s +/- 0.0334 | 15.000000 s (diff 0.000) | PASS |
| 7b | duration, audio stream | 15.000 s +/- 0.0334 | 15.019000 s (diff 0.019) | PASS |
| 7c | duration, format/container | 15.000 s +/- 0.0334 | 15.019000 s (diff 0.019) | PASS |
| 8 | full decode, ffmpeg stderr | empty | empty (exit 0) | PASS |

## Notes

- Container format_name is `mov,mp4,m4a,3gp,3g2,mj2` for both files.
- The audio and container run 0.019 s longer than the video (15.019 s vs 15.000 s). That is inside the 0.0334 s tolerance, so it is recorded as PASS, not as a defect.
- This is a container and stream check only. Playback, visual content and audio content were not reviewed here. A render is not acceptance by itself.

## Overall

Both files: 8/8 items PASS (10/10 sub-checks for item 7 included as listed above).
