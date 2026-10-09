#!/usr/bin/env bash
# Lossless post-render step: shift the AAC stream by -AAC_PRIMING_SAMPLES (from
# src/studio/demo-001/timing.ts) so the MP4 edit list trims the encoder priming.
# Video and audio packets are stream-copied (no re-encode).
# Usage: scripts/studio/demo-001/finalize-audio.sh <raw.mp4> <final.mp4>
set -euo pipefail
in="$1"; out="$2"
root="$(cd "$(dirname "$0")/../../.." && pwd)"
offset=$(cd "$root" && node --no-warnings --input-type=module -e "
import {AAC_PRIMING_SAMPLES, AUDIO_SAMPLE_RATE} from './src/studio/demo-001/timing.ts';
console.log((-AAC_PRIMING_SAMPLES / AUDIO_SAMPLE_RATE).toFixed(12));")
echo "audio offset: ${offset}s"
ffmpeg -v error -y -i "$in" -itsoffset "$offset" -i "$in" \
  -map 0:v:0 -map 1:a:0 -c copy -map_metadata -1 -fflags +bitexact -movflags +faststart "$out"
