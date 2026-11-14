import { defineConfig } from 'astro/config';

// Static output, served as Worker static assets (wrangler.jsonc). `file` keeps
// each page at the URL the sitemap lists: /privacy, not /privacy/.
export default defineConfig({
  site: 'https://bubo.weekndlabs.com',
  build: { format: 'file' },
});
