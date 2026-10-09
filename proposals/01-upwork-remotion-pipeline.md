# DRAFT, NOT SENT. Upwork: Remotion developer for an AI video pipeline
Lead: https://www.upwork.com/jobs/~022064242652585584503 (details from a search snippet only; the page returned 403, so verify before using this).
Owner sign-off needed before sending. The scope here is bigger than our standard offer.

---

Hi,

Your post asks for reusable Remotion components for an automated video pipeline. That is the kind of work this studio does: every video is a React/Remotion codebase, not an After Effects project.

**A recent example (studio demo, 15 s):**
- 16:9 (1920x1080) and a recomposed 9:16 (1080x1920) from one component tree. The layout switches on aspect ratio, so it is not a crop.
- 30 fps, 450 frames, H.264/AAC. Both files pass an automated ffprobe check (frame count, codec, pixel format, duration).
- Original sound synthesised in code from a seeded generator and frame-locked to every cut, which makes it reproducible byte for byte.
- Local fonts and assets only, so renders are deterministic. That is the property you need for Lambda rendering.
Files available on request.

**How I'd start:** a paid first milestone with 2-3 parameterised components (props for copy, colours and durations), each with a 16:9 and 9:16 composition and a render check script. You review the components before we scale up.

**Questions:**
1. What is your budget for the first milestone?
2. Is this on Remotion 4.x, and do you already hold a Remotion company licence?
3. What are your input formats (screen recordings, JSON scripts) and your target render time per video?

Thanks,
[owner name]
