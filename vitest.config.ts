import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte()],
	test: {
		alias: {
			"components/": new URL("./src/components", import.meta.url).pathname,
		},
	},
});
