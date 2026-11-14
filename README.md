# bubo-site

Marketing landing page for Bubo, at [bubo.weekndlabs.com](https://bubo.weekndlabs.com).
Astro, static output, no framework.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Deploy

Cloudflare Workers static assets, configured in `wrangler.jsonc`:

```sh
npm run build
npx wrangler deploy
```

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
