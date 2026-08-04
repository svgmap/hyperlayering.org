// src/lib/nav/build-tutorial-nav.ts
import { getCollection } from "astro:content";

export async function buildTutorialNav(): Promise<NavMenuItem[]> {
	const entries = await getCollection("tutorial");
	const byGroup = Map.groupBy(entries, (e) => e.data.group);
	console.log(byGroup);

/*
	return [...byChapter.entries()].map(([chapter, lessons]) => ({
		type: "group",
		label: chapter,
		items: lessons
			.sort((a, b) => a.data.order - b.data.order)
			.map((e) => ({
				type: "link",
				label: e.data.title,
				href: `/tutorial/${e.id}/`,
			})),
	}));
	*/
	return [];
}
