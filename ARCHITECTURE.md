# Architecture & Guardrails

## Folder Structure
- `/app`: Next.js App Router pages (e.g., `/work`, `/about`).
- `/components`: Reusable UI components (e.g., `navigation.tsx`, `bts-film-stripe.tsx`).
- `/public`: Strictly for lightweight assets ONLY (favicons, tiny logos).

## Hosting & analytics (Vercel)
- **Web Analytics:** `@vercel/analytics` is installed and `<Analytics />` from `@vercel/analytics/next` is rendered in the root `app/layout.tsx` so all locales and routes are covered.
- **Middleware / proxy:** `proxy.ts` matcher excludes `_vercel`, so Vercel-injected insight routes (`/_vercel/insights/*`) are not rewritten by i18n routing.
- **Dashboard (required once):** In the Vercel project → **Analytics** → enable **Web Analytics**. After the next production deploy, page views appear in the dashboard; in DevTools Network you should see requests to `/_vercel/insights/view` on deployed previews/production (often minimal or no traffic locally).

## Strict Technical Rules
1. **NO LOCAL MEDIA:** Absolutely no heavy `.mp4`, `.png`, or `.jpg` files in the local codebase or Git history. All project media, background videos, and BTS images MUST be loaded from the Cloudflare R2 CDN (`https://nonoise.media/...`).
2. **Editorial Layouts:** Avoid standard, wide horizontal text blocks. Use 12-column CSS grids (`grid-cols-12`) and constrain text widths (`max-w-xs`, `max-w-sm`) to force narrow, magazine-style columns. 
3. **Animations:** Use Framer Motion. Rely on `whileInView` with `viewport={{ once: true, amount: "some" }}` for scroll reveals rather than immediate `animate` to prevent items triggering before they are visible.
4. **Color Palette:** Strictly Dark Mode. Black backgrounds, off-white text, and subtle borders (`border-white/20`) for dividers. 
5. **Case Sensitivity:** Cloudflare R2 is case-sensitive. Always double-check exact file extensions (e.g., `.png` vs `.PNG`).
