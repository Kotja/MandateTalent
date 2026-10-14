# Localhost — postponed grain glow (Mac)

Use this when you want the **cursor-tail glow** in your own browser.  
Live Pages (`mandatetalent.com`) does **not** include this yet — only the branch below.

## On your machine

```bash
cd /Users/ekaterinazinich/Projects/MandateTalent
```

### 1. Get the tip with the tail glow

If this folder tracks **GitHub** `Kotja/MandateTalent`, ask the coordinator to land Origin branch  
`cursor/tactile-grain-illumination-5e3f` onto a GitHub branch you can pull, then:

```bash
git fetch origin
git checkout <branch-with-tail-glow>
git pull
```

If you already have Origin / the agent tip available:

```bash
git fetch
git checkout cursor/tactile-grain-illumination-5e3f
git pull
```

You want a tip that includes the postponed tail (after `1ca047d`), with changes in:

- `src/components/tactile-grain.tsx`
- `src/app/globals.css` (`.page-atmosphere__tail`)

### 2. Install and run

```bash
npm install
npx next dev --hostname 127.0.0.1 --port 45371
```

### 3. Open

[http://127.0.0.1:45371/](http://127.0.0.1:45371/)

Hard-refresh (Cmd+Shift+R). Move the mouse across the hero — a softer glow should **lag ~420ms** behind the pointer. The main cream/navy gradient stays as before.

### If you see no motion

- Confirm you’re not on `mandatetalent.com` / GitHub Pages
- Check macOS **Reduce motion** (System Settings → Accessibility) — the tail is disabled when that’s on
- Confirm the page source / DevTools shows an element with class `page-atmosphere__tail`
