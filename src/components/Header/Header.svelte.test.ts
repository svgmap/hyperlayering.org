import Header from "components/Header/Header.svelte";
import { flushSync, mount, unmount } from "svelte";
import { describe, expect, test } from "vitest";

describe("Header component", () => {
	const links = [
		{ href: "/about", label: "About" },
		{ href: "/blog", label: "Blog" },
	];

	test("Renders the brand title and nav links", () => {
		const header = mount(Header, {
			target: document.body,
			props: { title: "Test Header", currentPath: "/", links },
		});
	});
});
