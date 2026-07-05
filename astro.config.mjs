import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://hyperlayering.org/",
  integrations: [svelte()],

  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },

  adapter: cloudflare(),
});
