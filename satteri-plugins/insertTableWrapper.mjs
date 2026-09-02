// Wraps all tables with the .responsive-table class
import { defineHastPlugin } from "satteri";

export const insertTableWrapper = () =>
    defineHastPlugin({
        name: "insert-table-wrapper",
        element: {
            filter: ["table"],
            visit(node) {
                return {
                    type: "element",
                    tagName: "div",
                    properties: { className: ["table-responsive"] },
                    children: [node]
                }
            },
        },
    });
