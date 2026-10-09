import { defineMdastPlugin } from "satteri";

export const getHeaders = () =>
	defineMdastPlugin({
		name: "get-headers",
		heading(node, ctx) {
			const headers = ctx.data.astro.frontmatter.headers ?? [];
			if (node.depth !== 1) {
				headers.push({
					index: headers.length - 1,
					depth: node.depth,
					text: ctx.textContent(node),
				});
				ctx.data.astro.frontmatter.headers = headers;
			}
		},
	});
