# bubo-site

Marketing landing page for Bubo, at [bubo.weekndlabs.com](https://bubo.weekndlabs.com).
Astro, static output, no framework.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Deploy to Vercel

No config needed — Vercel detects Astro and builds `dist/`.

**From the CLI:**

```sh
npm i -g vercel
vercel           # preview
vercel --prod    # production
```

**From GitHub:** push this folder to a repo, then import it at
[vercel.com/new](https://vercel.com/new). Framework preset: Astro (auto). Build
command `astro build`, output `dist/`.

## Editing

Everything lives in `src/pages/index.astro` — copy, layout, and styles in one
file. Brand assets are in `public/` (`logo.png`, `demo.png`, `demo-dark.png`).
The colour and type tokens are the `:root` block at the top of the `<style>`.

## Releasing a new Bubo version

The site serves the app itself. `public/Bubo-apple-silicon.dmg` and
`public/Bubo-intel.dmg` are committed here, so a new version means:

1. replace both `.dmg` files
2. bump `version` in `src/pages/index.astro`
3. add the entry in `src/pages/releases.astro` and move `latest` / `download`
   onto it
