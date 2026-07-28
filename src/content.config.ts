// Defining schemas for content
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import tutorialLoader from "./loaders/tutorial-loader";

const update = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/updates" }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const tutorial = defineCollection({
	loader: tutorialLoader(),
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = { update, tutorial };
