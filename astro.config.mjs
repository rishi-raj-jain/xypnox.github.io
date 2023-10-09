import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import remarkBreaks from 'remark-breaks';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.xypnox.com',
  integrations: [solidJs(), mdx()],
  markdown: {
    remarkPlugins: [remarkBreaks],
  },
});
