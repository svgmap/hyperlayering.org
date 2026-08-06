// Defining schemas for content
import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const update = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/updates" }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const docs = defineCollection({
	loader: docsLoader(),
	schema: docsSchema(),
});

export const collections = { update, docs };
