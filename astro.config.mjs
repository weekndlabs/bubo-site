import { defineConfig } from 'astro/config';

// Static output (default). Vercel detects Astro and builds dist/ with no adapter.
export default defineConfig({
  site: 'https://bubo.vercel.app',
});
