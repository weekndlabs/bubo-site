import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// Hybrid, not server: the marketing pages and the changelog stay prerendered and
// cached exactly as before. Only the routes that have to know who is asking opt
// out, with `export const prerender = false`.
export default defineConfig({
  site: 'https://bubo.weekndlabs.com',
  output: 'hybrid',
  adapter: vercel(),
});
