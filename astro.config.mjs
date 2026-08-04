import cloudflare from "@astrojs/cloudflare";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
// import starlight from "@astrojs/starlight"; temp exclude
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import { cleanMarkdownLinks } from "./satteri-plugins/cleanMarkdownLinks.mjs";
import { docusaurusHeadingIds } from "./satteri-plugins/docusaurusHeadingIds.mjs";
import { extractH1 } from "./satteri-plugins/extractH1.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://hyperlayering.org/",
  integrations: [
    svelte(),
    sitemap(),
    expressiveCode({
      shiki: {
        langAlias: {
          svg: "xml",
        },
      },
    }),
  ],

  markdown: {
    processor: satteri({
      mdastPlugins: [extractH1()],
      hastPlugins: [docusaurusHeadingIds(), cleanMarkdownLinks()],
      features: { directive: true },
    }),
  },

  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: cloudflare(),
});
