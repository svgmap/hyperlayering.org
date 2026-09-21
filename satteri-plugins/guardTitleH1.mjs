import { defineMdastPlugin } from "satteri";
export const guardTitleH1 = () =>
	defineMdastPlugin({
		name: "guard-title-h1",
		heading(node, ctx) {
			if (node.depth === 1 && ctx.data.astro.frontmatter.title) {
				if (node.position) {
					console.warn(
						`Unexpected h1 at ${ctx.fileURL.pathname}:${node.position.start.line}:${node.position.start.column}-${node.position.end.line}:${node.position.end.column}`,
					);
				} else {
					console.warn(
						`Unexpected h1 in ${ctx.fileURL.pathname} (position unavailable)`,
					);
				}
				return ctx.setProperty(node, "depth", 2);
			}
			return node;
		},
	});
