# DARA RAMANANDHU — Portfolio

Personal portfolio of **DARA RAMANANDHU**, a B.Tech Data Science student at R.K College of Engineering.

Built with **React + Vite + Tailwind CSS**.

## Sections

- Hero — profile photo with rotating glow ring, data-network particle canvas
- About — honest student narrative + "Currently Learning" list
- Skills — grouped categories, clean badges (no inflated percentages)
- Projects — featured **Feed Bridge** + clearly-labelled "Coming Soon" placeholders
- Experience — learning & internship preparation (no fabricated jobs)
- Certificates — placeholder cards, easy to fill in
- Achievements — College Project Expo + reserved space
- GATE 2027 — Data Science & AI goal strip
- Contact — info + frontend-only form

## Run locally

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Edit your info

Almost everything (name, links, projects, skills, certificates, achievements)
lives in **`src/data/portfolio.js`**. Change it there and it updates site-wide.

Place your **photo** at `public/photo.jpg`.

## Deploy to Vercel

- Push this repo, then import it at [vercel.com/new](https://vercel.com/new).
- Vercel auto-detects Vite (see `vercel.json`): build `npm run build`, output `dist`.
- Every push to `main` redeploys automatically.