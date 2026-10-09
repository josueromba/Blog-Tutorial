#!/usr/bin/env bash
# Per-frame (1/30 s) peak level of an audio/video file, then the value at each cut vs. bed.
# Usage: scripts/studio/demo-001/audio-peaks.sh <file> [samplerate]
set -euo pipefail
tmp="$(mktemp)"
f="$1"; sr="${2:-48000}"; n=$((sr / 30))
ffmpeg -hide_banner -v error -i "$f" -vn -ac 2 -ar "$sr" \
  -af "asetnsamples=n=${n}:p=0,astats=metadata=1:reset=1,ametadata=mode=print:key=lavfi.astats.Overall.Peak_level:file=-" \
  -f null - | grep -o 'Peak_level=.*' | cut -d= -f2 | awk '{print NR-1, $1}' > "$tmp"
echo "frames_with_audio_stats: $(wc -l < "$tmp")"
for c in 0 75 165 255 330 390; do
  awk -v c=$c '
    $1>=c-1 && $1<=c+1 { if (hit=="" || $2>hit) { hit=$2; hf=$1 } }
    $1>=c-14 && $1<=c-9 { if (bed=="" || $2>bed) bed=$2 }
    END { if (c==0) bed="n/a"; printf "cut f%-3d  peak %7.2f dBFS at f%d   bed(max f%d..f%d) %s\n", c, hit, hf, c-14, c-9, bed }' "$tmp"
done
awk '{ if ($2!="-inf" && $2>m || m=="") { m=$2; mf=$1 } } END { printf "overall max per-frame peak: %.2f dBFS at f%d\n", m, mf }' "$tmp"
echo "last 6 frames:"; tail -6 "$tmp" | tr '\n' ' '; echo
rm -f "$tmp"
