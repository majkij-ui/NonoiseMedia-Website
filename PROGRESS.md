# Historical Log

## What was built recently
- Completely restructured the `/about` page into an asymmetrical, 12-column editorial grid.
- Implemented a 30-image interactive grid with a custom 500ms color-trail hover effect using Tailwind.
- Migrated 2.5GB of heavy video and image assets to a Cloudflare R2 bucket.
- Nuked and reset the Git repository history to bypass GitHub's size limits and enable Vercel CI/CD.
- Fixed a Framer Motion viewport bug on the `/work` page where the "ZAUFALI NAM" logos wouldn't load on tall desktop screens.
- Updated all CDN links to point to the live production domain (`https://nonoise.media`).

## What broke & how we fixed it
- *Issue:* Git push failed due to huge `.mp4` files being stuck in history. *Fix:* Wiped the `.git` directory and re-initialized a fresh timeline.
- *Issue:* Cloudflare loops failed to find images. *Fix:* R2 is case-sensitive and file-specific; replaced math-based loops with exact hardcoded filename arrays for `.jpg`, `.JPG`, and `.png`.

## What to do next
- Generate and finalize the `TODO.md` roadmap.
- Develop a high-converting Ad Landing Page.
- Configure Next.js SEO Metadata (OpenGraph) for social sharing.
