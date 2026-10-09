# Launch the motion-design studio: Sonnet 5.5 main + Opus 5.5 advisor.
Set-Location $PSScriptRoot
claude --model claude-sonnet-5-5 --advisor claude-opus-5-5 @args
