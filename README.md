# Adam Field — Portfolio Website

Personal portfolio site built with vanilla TypeScript + Vite, deployed on Cloudflare Pages.

## Development

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

## Deployment

The site deploys automatically to Cloudflare Pages on push to `main`.

Manual deploy:

```bash
npm run deploy     # runs build then: wrangler pages deploy dist
```

## Placeholder content

All items marked `// TODO: replace` need real data before launch:

- `public/assets/photo.jpg` — profile photo
- `src/data/projects.ts` — real project list
- `src/data/skills.ts` — proficiency ratings
- `src/data/cv.ts` — career history
- `src/sections/home.ts` — social link URLs
- `src/sections/about.ts` — bio text

## Analytics

Events are posted to `/api/track` (Cloudflare Pages Function at `functions/api/track.ts`).
To enable Cloudflare Analytics Engine, uncomment the binding in `wrangler.toml` and
configure the dataset in the Cloudflare dashboard.
