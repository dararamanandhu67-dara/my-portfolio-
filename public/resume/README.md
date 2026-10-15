# Resume

The published resume is `DARA_RAMANANDHU_Resume.pdf` (generated from
`../../scripts/resume.html` — see the "Resume" section of the root README).

It is served two ways:

- **Static:** `/resume/DARA_RAMANANDHU_Resume.pdf` (direct link, used as fallback)
- **Backend:** `GET /api/resume` — streams the same PDF with
  `Content-Disposition: attachment`, so visitors always get a clean filename.
  `GET /api/resume?meta=1` reports whether the file exists (used by the UI).

If you rename the file, update `resumeUrl` in `src/data/portfolio.js` and
`RESUME_PATH` / `RESUME_FILENAME` in the environment (see `.env.example`).

To publish a PDF exported from Word/Canva/LaTeX instead of the HTML source,
overwrite this file with the same filename and it will be picked up automatically.
