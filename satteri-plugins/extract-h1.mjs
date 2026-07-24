// Extracts the H1 attribute from Markdown and attaches it as a 'title' attribute if not already defined in frontmatter
import { defineMdastPlugin } from "satteri";
export const extractH1 = () =>
	defineMdastPlugin({
		name: "extract-h1",
		heading(node, ctx) {
			if (node.depth === 1 && !ctx.data.astro.frontmatter.title) {
				ctx.data.astro.frontmatter.title = ctx.textContent(node);
			}
		},
	});
