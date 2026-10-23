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

The form posts from the browser to a Google Apps Script web app, which appends a row to the Signups spreadsheet. Each row has a timestamp, email, audience (`talent` or `hiring`), a message and the source hostname. The message holds the other answers as labelled lines.

The build inlines two variables:

- `NEXT_PUBLIC_INTEREST_ENDPOINT`: the Apps Script `/exec` URL
- `NEXT_PUBLIC_INTEREST_SECRET`: must match `SHARED_SECRET` in the script

For local work, put both in `.env.local`. The Pages workflow sets the endpoint itself and reads the secret from the `INTEREST_SECRET` repository variable. The secret ends up in the public JavaScript bundle, so it only keeps casual bots out.

If the save fails, the form stays filled and shows an error. It does not report a success unless the script confirmed the row.

## Optional: static export / Pages

`npm run build:pages` sets `STATIC_EXPORT=true`, which builds `out/` with `output: "export"` and `trailingSlash`. The export is rooted for https://mandatetalent.com/, so it does not use a `/MandateTalent` base path. Pages deploys `out/` from GitHub Actions. `public/CNAME` is `mandatetalent.com`. Day-to-day work stays on localhost (`npm run local`).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui. Fonts: Inter and JetBrains Mono. Icons: Humble Icons.
