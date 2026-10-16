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

The form posts from the browser to a Google Apps Script web app, which appends a row to the Signups spreadsheet. Each row has a timestamp, email, audience (`talent` or `hiring`), a message and the source hostname. The message holds the other answers as labelled lines.

The build inlines two variables:

- `NEXT_PUBLIC_INTEREST_ENDPOINT`: the Apps Script `/exec` URL
- `NEXT_PUBLIC_INTEREST_SECRET`: must match `SHARED_SECRET` in the script

For local work, put both in `.env.local`. The Pages workflow sets the endpoint itself and reads the secret from the `INTEREST_SECRET` repository variable. The secret ends up in the public JavaScript bundle, so it only keeps casual bots out.

If the save fails, the form stays filled and shows an error. It does not report a success unless the script confirmed the row.

## GitHub Pages

`npm run build:pages` sets `STATIC_EXPORT=true`, which builds `out/` with `output: "export"` and `trailingSlash`. The export is rooted for https://mandatetalent.com/, so it does not use a `/MandateTalent` base path. Pages deploys `out/` from GitHub Actions. `public/CNAME` is `mandatetalent.com`.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Headings use Bodoni Moda SC. Body text uses Montserrat. Icons are Humble Icons.
