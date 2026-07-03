
import Header from "./Header.svelte";
import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

test("Header", async () => {
    render(Header, { currentPath: "", links: [{ href: "/test", label: "Test" }] });
})


