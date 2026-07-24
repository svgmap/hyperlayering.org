// Generates heading ID attributes using the same format as Docusaurus
import { defineHastPlugin } from "satteri";

const headingFormatRegex = /{#\S*}/;
const rawIdRegex = /({#|}(\n|\s|$))/g;

export const docusaurusHeadingIds = () =>
  defineHastPlugin({
    name: "docusaurus-heading-ids",
    element: {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      visit(node, ctx) {
        const rawText = ctx.textContent(node);
        if (headingFormatRegex.test(rawText)) {
          const id = headingFormatRegex
            .exec(rawText)[0]
            .replace(rawIdRegex, "");
          const updatedText = rawText.replace(headingFormatRegex, "").trim();
          return {
            ...node,
            id,
            children: [{ type: "text", value: updatedText }],
          };
        }
      },
    },
  });
