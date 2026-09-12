# Mossbyte — Walk Into the Signal

An interactive WebGL field study shaped by attention, movement and time.
Built with Next.js, React, Three.js, Motion, and Tailwind CSS.

Live scroll-driven 3D ecosystem: a guardian creature follows your pointer,
particles drift, camera parallaxes with scroll, custom cursor + journey meter.

## Stack

- Next.js 16 (App Router)
- React 19
- Three.js
- Motion
- Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run lint` — lint

## Deploy to Vercel

1. Push to GitHub:
   ```bash
   git init # if needed
   git add .
   git commit -m "feat: mossbyte webgl experience"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Next.js**. No env vars required.
4. Deploy. `npm run build` must pass — it does.

No database, no API keys, no edge bindings required.

## Project structure

```
app/
  page.tsx        — hero, chapters, closing sections
  experience.tsx  — Three.js world + cursor + scroll logic (client)
  layout.tsx      — metadata + font/html shell
  globals.css     — design system
public/
  favicon.svg
```

## License

MIT
