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

On the local server the form posts to `POST /api/interest`. Valid submissions append to `data/interest-submissions.json` (gitignored).

GitHub Pages is a static export and has no API. Local `npm run local` / `npm run build` + `npm start` keep the handler.

## Optional: static export / Pages

```bash
npm run build:pages
```

Builds `out/` for GitHub Pages (`mandatetalent.com`). Use only when you intend to publish — day-to-day work stays on localhost.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui. Headings: Bodoni Moda SC. Body: Montserrat. Icons: Humble Icons.
