// Cleans/strips links to .md pages to correctly reference the generated pages (without.md)
import { defineHastPlugin } from "satteri";

const indexRegex = /\/index\.md/i;

export const cleanMarkdownLinks = () =>
	defineHastPlugin({
		name: "clean-markdown-links",
		element: {
			filter: ["a"],
			visit(node, ctx) {
				if (node.properties?.href?.includes("../")) {
					const cleanHref = node.properties.href.replace(indexRegex, "");
					ctx.setProperty(node, "href", cleanHref);
				}
			},
		},
	});
