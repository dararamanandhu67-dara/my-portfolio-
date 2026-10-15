# DARA RAMANANDHU - Portfolio

Personal portfolio of **DARA RAMANANDHU**, a B.Tech Data Science student at R.K College of Engineering.

Built with **React + Vite + Tailwind CSS**, with a small serverless backend (Vercel
Functions) for the contact form and resume downloads.

## Sections

- Hero - profile photo with rotating glow ring, data-network particle canvas
- About - honest student narrative + "Currently Learning" list
- Skills - grouped categories, clean badges (no inflated percentages)
- Projects - featured **Feed Bridge** + clearly-labelled "Coming Soon" placeholders
- Experience - learning & internship preparation (no fabricated jobs)
- Certificates - placeholder cards, easy to fill in
- Achievements - College Project Expo + reserved space
- GATE 2027 - Data Science & AI goal strip
- Contact - info panel + working contact form

## Run locally

```bash
npm install
npm run dev          # frontend only  -> http://localhost:5173
npx vercel dev       # full stack (frontend + /api functions)
npm run build        # production build into dist/
npm run preview      # preview the production build
```

Use `npx vercel dev` when working on the contact form or resume download - the
plain Vite dev server does not serve `/api`. The UI degrades gracefully either
way (it falls back to a direct email link / static file).

## Backend (Vercel Functions)

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/contact` | `POST` | Validates and emails contact-form messages (honeypot + rate limiting). |
| `/api/resume?meta=1` | `GET` | Returns JSON: is the PDF available, filename, size, optional download count. |
| `/api/resume` | `GET` | Streams the resume PDF as a download with the correct filename. |

`POST /api/contact` payload: `{ name, email, subject?, message, company? }`
(`company` is the honeypot and must stay empty).

### Email delivery

Configure **one** provider in the environment:

1. **Resend** (recommended) - `RESEND_API_KEY`, plus `CONTACT_TO_EMAIL` and
   `CONTACT_FROM_EMAIL` (a sender verified in Resend).
2. **Webhook** - `CONTACT_WEBHOOK_URL`, any JSON endpoint (Formspree, Make,
   Zapier, Google Apps Script). Used when `RESEND_API_KEY` is empty.

If neither is set the endpoint returns `503 not_configured` and the form shows a
"email me directly" fallback instead of failing silently.

### Resume

1. The resume PDF lives at `public/resume/DARA_RAMANANDHU_Resume.pdf`. Its source
   is `scripts/resume.html` — edit that file, then regenerate the PDF with a
   headless browser, e.g. on Windows:

   ```powershell
   & "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new `
     --disable-gpu --no-pdf-header-footer `
     --print-to-pdf="public/resume/DARA_RAMANANDHU_Resume.pdf" `
     "file:///$((Resolve-Path scripts/resume.html).Path -replace '\\','/')"
   ```

2. Resume buttons (navbar, hero) call `/api/resume`; if the file is missing the
   visitor sees a friendly message plus your email instead of a 404.
3. Optional: add `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` to keep a
   persistent download counter.

All environment variables are documented in **`.env.example`**.

## Edit your info

Almost everything (name, links, projects, skills, certificates, achievements)
lives in **`src/data/portfolio.js`**. Change it there and it updates site-wide.

Place your **photo** at `public/photo.jpg`.

## Deploy to Vercel

- Push this repo, then import it at [vercel.com/new](https://vercel.com/new).
- Vercel auto-detects Vite (see `vercel.json`): build `npm run build`, output
  `dist`; files in `api/` become serverless functions automatically.
- Add the environment variables from `.env.example` in
  **Settings -> Environment Variables**, then redeploy.
- Every push to `main` redeploys automatically.
