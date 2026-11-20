# Role & Context
Act as a Senior Next.js Developer. We are currently loading 30 small PNG images from a Cloudflare R2 bucket (`assets.nonoise.media`) using standard HTML `<img>` tags inside a CSS grid. 

# Objective
Refactor the codebase to use the Next.js `<Image>` component (`next/image`) to automatically convert these PNGs to WebP/AVIF, lazy-load them, and improve Core Web Vitals, without breaking the existing Framer Motion animations or Tailwind styling.

# Execution Steps

## 1. Update Next.js Configuration
- Locate the `next.config.js` or `next.config.mjs` file.
- Add the `assets.nonoise.media` domain to the `images.remotePatterns` array so Next.js allows optimization from this external Cloudflare R2 source.
- Example configuration to inject:
  ```javascript
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.nonoise.media',
        pathname: '/**',
      },
    ],
  },
2. Refactor the Grid Component
Locate the file containing the Hero component with the gridImages mapping.

Import Image from "next/image".

Replace the existing <img /> tag with the <Image /> component.

3. Styling & Props Adjustments
Because the parent motion.div has aspect-square overflow-hidden, use the fill property on the <Image> component instead of hardcoded width/height to ensure it perfectly responds to the grid.

Keep the exact same className for styling, grayscale effects, and transitions: className="object-cover grayscale opacity-70 transition-all duration-[2000ms] ease-out hover:grayscale-0 hover:opacity-100 hover:duration-[50ms]"

Add a sizes attribute to prevent Next.js from serving unnecessarily large images. Since it's a 6-column grid on desktop, something like sizes="(max-width: 768px) 33vw, 16vw" is appropriate.

Fix the SEO issue by adding a programmatic alt tag, e.g., alt={\Nonoise Media produkcja wideo - ujęcie ${i + 1}`}`.

Please execute these changes across the relevant files.


***

### One quick heads-up on Vercel:
When you use Next.js `<Image>`, Vercel's servers do the processing (converting PNG to WebP). Vercel gives you a generous allowance of optimized images on their free tier (usually around 1,000 source images per month), which is more than enough for this 30-image grid. But if you ever start uploading thousands of photos, keep an eye on your Vercel usage dashboard so you don't get hit with optimization overage charges!