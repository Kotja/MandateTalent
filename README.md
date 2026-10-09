# Mandate Talent

A one-page interest site for Mandate Talent, an Australian marketplace for short, defined cover contracts. People register as talent or as someone hiring. Nothing here connects to a live marketplace, an account system, or payroll.

## Run locally

```bash
npm install
npm run dev
```

The dev server in this project is meant to be opened on port **43127**:

```bash
npx next dev --hostname 0.0.0.0 --port 43127
```

Or build and serve the production app:

```bash
npm run build
npx next start --hostname 0.0.0.0 --port 43127
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Interest submissions

On the local server the form posts to `POST /api/interest`. Valid submissions are appended to `data/interest-submissions.json`. That file is gitignored. Do not commit it.

GitHub Pages is a static export and has no API. If the save cannot be reached, the form stays filled and shows an error. It does not report a success unless a submission was stored.

## GitHub Pages

`npm run build:pages` sets `STATIC_EXPORT=true`, which builds `out/` with `output: "export"` and `trailingSlash`. The export is rooted for https://mandatetalent.com/, so it does not use a `/MandateTalent` base path. Local dev and `next start` keep the interest API. Pages deploys `out/` from GitHub Actions. `public/CNAME` is `mandatetalent.com`.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Headings use Bodoni Moda SC. Body text uses Montserrat. Icons are Humble Icons.
