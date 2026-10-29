// src/pages/preview/[name].css.ts
import baseCss from "../../styles/base.css?inline";
import contentCss from "../../styles/content.css?inline";

const styles: Record<string, string> = {
	base: baseCss,
	content: contentCss,
};

export const getStaticPaths = () =>
	Object.keys(styles).map((name) => ({ params: { name } }));

export const GET = ({ params }: { params: { name: string } }) =>
	new Response(styles[params.name], {
		headers: { "Content-Type": "text/css" },
	});
