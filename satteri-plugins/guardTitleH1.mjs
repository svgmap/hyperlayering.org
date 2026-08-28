import { defineMdastPlugin } from "satteri";
export const guardTitleH1 = () =>
	defineMdastPlugin({
		name: "guard-title-h1",
		heading(node, ctx) {
			if (node.depth === 1 && ctx.data.astro.frontmatter.title) {
				console.warn(
					`Unexpected h1 at ${ctx.fileURL.pathname}:${node.position.start.line}:${node.position.start.column}-${node.position.end.line}:${node.position.end.column}`,
				);
				ctx.setProperty(node, "depth", 2);
			}
		},
	});
