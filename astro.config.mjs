import { defineConfig } from 'astro/config';

// Static output. Vercel detects Astro and builds dist/ with no adapter.
//
// The dashboard is prerendered too, for now. It becomes server-rendered when
// Clerk lands, and that is the change that brings the adapter back: pair it
// with an Astro version whose adapter targets a supported Node, since
// @astrojs/vercel@7 pins nodejs18.x and Vercel rejects that runtime outright.
export default defineConfig({
  site: 'https://bubo.weekndlabs.com',
});
