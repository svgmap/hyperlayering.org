/// <reference types="vitest/config" />

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { svelteTesting } from '@testing-library/svelte/vite'
import { getViteConfig } from "astro/config";

export default getViteConfig({
  resolve: { conditions: ["browser"] },
  plugins: [svelte(), svelteTesting()],
  test: {
    environment: "jsdom",
    setupFiles: ['./vitest-setup.js'],
  },
});
