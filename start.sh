#!/usr/bin/env bash
# Launch the motion-design studio: Sonnet 5.5 main + Opus 5.5 advisor.
cd "$(dirname "$0")" && exec claude --model claude-sonnet-5-5 --advisor claude-opus-5-5 "$@"
