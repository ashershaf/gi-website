# Dr. Asher Shafrir — Website

Bilingual (Hebrew / English) personal website with a small backend for the contact form.

## Structure

- `he/`, `en/` — the site pages, mirrored per language (`index.html` = About, `gi-conditions.html`, `academia.html`, `contact.html`)
- `assets/` — shared CSS, JS, and images (`assets/images/profile.jpg` and `assets/images/poster.jpg` need to be added — see below)
- `server/` — Node.js backend: serves the whole site and stores contact-form submissions

## Adding your photos

Drop two files into `assets/images/`:
- `profile.jpg` — your portrait, shown on the About/home page
- `poster.jpg` — the conference photo, shown on the Academia page

The pages already reference these paths, and show a text placeholder until the files exist.

## Running the site

```bash
cd server
npm install
npm start
```

Then open `http://localhost:3000/`. The server serves the static site *and* the contact-form API from one process, so nothing else needs to run.

## Contact form &amp; daily email digest

Submissions are always saved to `server/data/submissions.db` (SQLite), even before you set up email.

To also receive a daily email summary of the previous day's messages:

1. `cp server/.env.example server/.env`
2. Fill in real SMTP credentials (a Gmail **App Password** works well — Google Account → Security → 2-Step Verification → App passwords) and the address that should receive the digest.
3. Restart the server. It will email a summary once a day (default 8:00 AM Asia/Jerusalem) — only on days with at least one new submission.
4. To test the digest immediately without waiting: `npm run send-digest`

No email is ever sent per-submission — only the once-a-day digest, as requested.

## Publishing the site

This currently runs locally. To make it reachable on the internet, the `server/` folder needs to run on a small always-on host (e.g. a VPS, Render, or Railway) with a domain pointed at it — happy to help set that up when you're ready.
