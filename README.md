# Mandate Talent

One-page interest site for Mandate Talent — short, defined cover contracts in Melbourne. Register as talent or as someone hiring. Nothing here connects to a live marketplace, accounts, or payroll.

## Run on your computer (localhost)

```bash
npm install
npm run local
```

Open **[http://127.0.0.1:45371/](http://127.0.0.1:45371/)**.

That is the whole loop: install → `npm run local` → browser. No tunnels, no gateways, no Pages required.

Step-by-step for a Mac checkout: see [LOCALHOST.md](./LOCALHOST.md).

`npm run dev` also works if you want the default Next port; prefer `npm run local` so everyone hits the same URL.

## Interest submissions

The form posts to the Google Apps Script web app (`NEXT_PUBLIC_INTEREST_ENDPOINT`) with `email`, `audience`, `message`, and `source`. The shared token is `NEXT_PUBLIC_INTEREST_SECRET` (public in the page by design). Local values live in `.env.local`. The Pages workflow injects the same values at build time.

`POST /api/interest` still appends to `data/interest-submissions.json` on the local server, but the form does not use it.

## Optional: static export / Pages

```bash
npm run build:pages
```

Builds `out/` for GitHub Pages (`mandatetalent.com`). Use only when you intend to publish — day-to-day work stays on localhost.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui. Headings: Bodoni Moda SC. Body: Montserrat. Icons: Humble Icons.
