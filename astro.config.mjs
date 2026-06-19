// @ts-check
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
});
