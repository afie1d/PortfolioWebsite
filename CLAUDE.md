# Portfolio Website — CLAUDE.md

## Project Overview

Personal portfolio website for Adam Field, a machine learning engineer.
Single-page application hosted on Cloudflare Pages. Five vertically-stacked
sections: Home, About, Projects, Skills, CV.

---

## Tech Stack

- **Framework**: Vanilla TypeScript + Vite (no heavy frontend frameworks unless
  strictly necessary — keep the bundle lean)
- **Styling**: CSS custom properties for theming; no CSS-in-JS
- **Deployment**: Cloudflare Pages via `wrangler` CLI
- **Observability**: Cloudflare Analytics Engine (or Workers Analytics) for
  pageview and click-event logging; no third-party trackers
- **Package manager**: `npm`

---

## Project Structure

```
portfolio/
├── CLAUDE.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── wrangler.toml              # Cloudflare Pages + Analytics config
├── public/
│   ├── favicon.ico
│   └── assets/
│       └── photo.jpg          # Adam's profile photo (add manually)
├── src/
│   ├── main.ts                # Entry point, scroll/nav logic
│   ├── analytics.ts           # Event tracking helpers
│   ├── sections/
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── cv.ts
│   ├── data/
│   │   ├── projects.ts        # Project list (name, desc, skills, github url)
│   │   ├── skills.ts          # Skill list (name, category, proficiency 1-5)
│   │   └── cv.ts              # Career timeline entries
│   └── styles/
│       ├── tokens.css         # Design tokens (colors, spacing, typography)
│       ├── global.css
│       ├── nav.css
│       └── sections/
│           ├── home.css
│           ├── about.css
│           ├── projects.css
│           ├── skills.css
│           └── cv.css
└── dist/                      # Build output (gitignored)
```

---

## Design System

### Color Tokens (edit in `src/styles/tokens.css`)

```css
:root {
  /* Background */
  --color-bg-page:       #0a0a0f;
  --color-bg-surface:    #13131a;
  --color-bg-elevated:   #1c1c26;

  /* Accent (change this single variable to shift the whole palette) */
  --color-accent:        #6c63ff;
  --color-accent-dim:    #6c63ff33;
  --color-accent-hover:  #8a83ff;

  /* Text */
  --color-text-primary:  #f0f0f5;
  --color-text-secondary:#9090a8;
  --color-text-muted:    #55556a;

  /* Border */
  --color-border:        #ffffff12;
  --color-border-hover:  #ffffff28;

  /* Skill bar */
  --color-skill-filled:  var(--color-accent);
  --color-skill-empty:   #ffffff14;

  /* Spacing */
  --section-padding:     clamp(4rem, 10vw, 8rem);
  --content-max-width:   1100px;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.25rem;
  --font-size-xl:   2rem;
  --font-size-hero: clamp(2.5rem, 6vw, 4.5rem);

  /* Motion */
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;
  --transition-section: 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Hover States
Every interactive element must have a hover state. Use `transition: var(--transition-base)`.
Preferred effects:
- Cards/tiles: subtle upward translate (`translateY(-4px)`) + border brightens
- Links/buttons: color shifts to `--color-accent-hover` + soft underline reveal
- Nav items: accent underline slides in from left
- Skill bars: bars glow very slightly (box-shadow on the filled segments)

---

## Section Specifications

### Home
- Full-viewport-height landing
- Name in hero font size, centered or left-aligned
- One-line site description in secondary text color
- Social links: LinkedIn, GitHub, Email — icon + label, open in new tab
- Subtle animated background (CSS-only, e.g. slow radial gradient drift or
  faint grid lines) — nothing that affects performance

### About
- Two-column layout on desktop (text left, photo right); stacked on mobile
- Profile photo: circular crop, 260–300px, subtle border using accent color
- Text: 3–5 sentences describing career and ambitions (placeholder text OK
  initially — clearly marked with `<!-- TODO: replace -->`)

### Projects
- Responsive CSS grid: 3 cols desktop, 2 tablet, 1 mobile
- Each tile:
  - Project name (bold, primary text)
  - Short description (secondary text, max 2 lines with text-overflow)
  - Skill tags (small pills using accent color)
  - GitHub link icon in top-right corner — links to repo
  - Entire tile is clickable (links to GitHub repo)
- Data lives in `src/data/projects.ts` as a typed array — never hardcoded in HTML

### Skills
- Grouped by category: "Machine Learning / AI", "Software Development",
  "Product Management"
- Each skill row: name on left, 5 proficiency bars on right
- Bars: thin rectangles (~40px × 6px), gap between them, filled = accent color,
  empty = `--color-skill-empty`
- Hover on a skill row: bars animate in from left (staggered, 60ms delay each)
- On page load: bars fill in with a staggered animation per category
  (intersection observer triggers it when section scrolls into view)

### CV (Career Timeline)
- Vertical center line
- Entries alternate left/right as you scroll down
- Each entry: role title, company, date range, 1–2 sentence description
- Entry cards slide in from their respective side when scrolled into view
  (Intersection Observer + CSS animation, no JS animation libraries)
- Data lives in `src/data/cv.ts` as a typed array

---

## Navigation

- Fixed top banner, ~56px tall, semi-transparent background with backdrop-blur
- Logo/name on left, section links on right
- Active section highlighted (tracked via Intersection Observer on each section)
- Mobile: hamburger menu → full-screen overlay nav
- Smooth scroll to section on nav link click (CSS `scroll-behavior: smooth`
  plus JS fallback for Safari)

---

## Scroll Animations (Section Transitions)

- Each section fades + slides up into view as it enters the viewport
- Use Intersection Observer (threshold: 0.15)
- CSS class approach: add `.is-visible` class, define the animation purely in CSS
- NO JavaScript animation libraries (GSAP, Framer Motion, etc.) — keep it native

```css
.section {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity var(--transition-section),
              transform var(--transition-section);
}
.section.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Observability

All tracking is privacy-first and uses Cloudflare's built-in tooling.

### What to track
1. **Pageview** — on load, log `{ event: "pageview", timestamp }`
2. **Section view** — when each section becomes visible via Intersection Observer,
   log `{ event: "section_view", section: "projects" }`
3. **Link click** — on any outbound link or CTA, log `{ event: "link_click",
   label: "github_projectX" }`

### Implementation
- Use `src/analytics.ts` as a thin wrapper
- In production: fire events to Cloudflare Analytics Engine via a Worker endpoint
- In development: `console.debug('[analytics]', event)` only — no network calls

```ts
// src/analytics.ts
export function track(event: string, data?: Record<string, string>) {
  if (import.meta.env.DEV) {
    console.debug('[analytics]', { event, ...data });
    return;
  }
  // POST to /api/track (Cloudflare Worker)
  navigator.sendBeacon('/api/track', JSON.stringify({ event, ...data,
    ts: Date.now() }));
}
```

---

## Responsive Breakpoints

```
mobile:  < 640px
tablet:  640px – 1024px
desktop: > 1024px
```

Use `clamp()` for fluid typography and spacing wherever possible.
Mobile-first CSS: write base styles for mobile, override for larger screens.

---

## Development Workflow

```bash
npm run dev      # Vite dev server, hot reload
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run deploy   # wrangler pages deploy dist/
```

### Local dev → Cloudflare Pages
- `wrangler.toml` points to `dist/` as build output
- Cloudflare Pages is connected to the GitHub repo
- Merging to `main` triggers automatic deployment
- Preview deployments are created for every PR/branch automatically

---

## Code Style

- TypeScript strict mode (`"strict": true` in tsconfig)
- No `any` types — use `unknown` and narrow
- ES modules only (no CommonJS)
- CSS: BEM-ish naming for components (`.projects-grid`, `.skill-row`, etc.)
- No `!important` in CSS
- All content data is in `src/data/` — never hardcoded in markup or logic

---

## Constraints

- No React, Vue, or similar frameworks
- No animation libraries (GSAP, Anime.js, etc.)
- No CSS frameworks (Tailwind, Bootstrap, etc.)
- No Google Fonts CDN — self-host Inter and JetBrains Mono via `@font-face`
  (download from Fontsource or Bunny Fonts at build time)
- Bundle size target: < 100KB JS (gzipped), < 30KB CSS (gzipped)
- Lighthouse score target: ≥ 90 across all categories

---

## Placeholder Data

Use realistic placeholder data during development. Mark all placeholder content
with `// TODO: replace` comments. Key items needing real content:
- `public/assets/photo.jpg` — profile photo
- About section paragraph
- Projects list (name, description, GitHub URLs, skills)
- Skills list (proficiency ratings)
- CV entries (roles, companies, dates, descriptions)