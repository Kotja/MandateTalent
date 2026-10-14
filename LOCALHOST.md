# Mandate Talent — local only

No tunnels. No Cloudflare. No loca.lt. Just your machine.

## One-time setup

```bash
cd /Users/ekaterinazinich/Projects/MandateTalent
git fetch origin
git checkout cursor/localhost-refresh-7fe0
git pull origin cursor/localhost-refresh-7fe0
npm install
```

If that branch is not on GitHub yet, get it from whoever last pushed the tip, or ask the coordinator to land `cursor/localhost-refresh-7fe0` onto `Kotja/MandateTalent`.

## Every time you want the site

```bash
cd /Users/ekaterinazinich/Projects/MandateTalent
npm run local
```

Wait for `Ready`, then open:

**http://127.0.0.1:45371/**

Leave the Terminal window running. If you close it, the browser will say “refused to connect” — that means nothing is listening on your Mac yet.

## What this branch includes

- Interest landing page (talent / hiring form)
- Crystal glass CTAs + theme toggle
- Tactile grain + comet cursor trail
- Local `POST /api/interest` → `data/interest-submissions.json` (gitignored)

## What this is not

- Not GitHub Pages / `mandatetalent.com` (that can lag behind)
- Not a tunnel URL from a cloud agent
- Not a live marketplace — interest capture only
