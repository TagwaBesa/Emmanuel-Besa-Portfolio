# Emmanuel Besa - Portfolio

One-page portfolio built with React, TypeScript, Vite, Tailwind CSS v4, anime.js and Lucide.

## Run

```bash
npm install
npm run dev      # development
npm run build    # type-check + production build into dist/
npm run preview  # serve the build
```

## Things to set before publishing

1. **Contact form email delivery**: create a free form at https://formspree.io, copy `.env.example` to `.env`
   and set `VITE_FORM_ENDPOINT`. Without it the form falls back to opening the visitor's email app (mailto).
2. **LinkedIn / GitHub**: set `linkedin` and `github` in `src/data/content.ts`. Empty values show a "soon" chip.
3. **Photo**: drop `profile.jpg` (or .png/.webp) into `src/assets/`; it replaces the placeholder automatically.
4. **CV**: replace `public/Emmanuel-Besa-CV.pdf` with your own CV (same file name). The included one is generated
   from the portfolio content only.
5. **Projects**: edit `src/data/content.ts`. Statuses ("Completed" / "In development") and tech stacks are
   working assumptions: confirm them. Real screenshots can replace the illustrated placeholders in `ProjectArt.tsx`.
6. **Social preview**: `public/og-image.png`; add your final site URL to the Open Graph tags in `index.html`.

## Structure

- `src/data/content.ts` - all copy, projects, experience, skills
- `src/hooks/motion.ts` - anime.js reveal, counter, active-section hooks (all respect `prefers-reduced-motion`)
- `src/components/*` - one component per section
