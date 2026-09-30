import Header from "@components/Header/Header.svelte";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

describe("Header Component", () => {
	const defaultLinks = [
		{ href: "/tutorials/", label: "Tutorials" },
		{ href: "/demos/", label: "Demos" },
	];

	function renderHeader(currentUrl = new URL("https://example.test/")) {
		return render(Header, {
			props: { currentUrl, links: defaultLinks },
		});
	}

	test("renders the default brand, supplied navigation, and external GitHub link", () => {
		renderHeader();

		expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
		expect(screen.getByText("HLA")).toBeTruthy();
		expect(screen.getByRole("link", { name: "Tutorials" }).getAttribute("href")).toBe(
			"/tutorials/",
		);
		expect(screen.getByRole("link", { name: "Demos" }).getAttribute("href")).toBe(
			"/demos/",
		);

		const githubLink = screen.getByRole("link", {
			name: "Explore the project on GitHub",
		});
		expect(githubLink.getAttribute("href")).toBe("https://github.com/svgmap");
		expect(githubLink.getAttribute("target")).toBe("_blank");
		expect(githubLink.getAttribute("rel")).toBe("noopener noreferrer");
	});

	test("renders a custom title and associates the menu toggle with navigation", () => {
		render(Header, {
			props: { currentUrl: new URL("https://example.test/"), links: defaultLinks, title: "Hyper Layering" },
		});

		expect(screen.getByText("Hyper Layering")).toBeTruthy();
		expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");

		const menu = screen.getByRole("navigation");
		const toggle = screen.getByRole("button", { name: "Open Navigation Menu" });
		expect(toggle.getAttribute("aria-controls")).toBe(menu.id);
		expect(menu.id).toBe("nav-menu");
	});

	test("opens and closes the mobile menu with matching accessible state", async () => {
		renderHeader();

		const menu = screen.getByRole("navigation");
		const openButton = screen.getByRole("button", { name: "Open Navigation Menu" });
		expect(openButton.getAttribute("aria-expanded")).toBe("false");
		expect(menu.classList.contains("nav-open")).toBe(false);

		await fireEvent.click(openButton);

		const closeButton = screen.getByRole("button", { name: "Close Navigation Menu" });
		expect(closeButton.getAttribute("aria-expanded")).toBe("true");
		expect(menu.classList.contains("nav-open")).toBe(true);

		await fireEvent.click(closeButton);

		expect(screen.getByRole("button", { name: "Open Navigation Menu" }).getAttribute(
			"aria-expanded",
		)).toBe("false");
		expect(menu.classList.contains("nav-open")).toBe(false);
	});

	test("renders localized labels and language links for a Japanese page", () => {
		renderHeader(new URL("https://example.test/ja/tutorials/1-basic/"));

		expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/ja/");
		expect(screen.getByRole("button", { name: "言語を変更する" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "ナビゲーションメニューを開く" })).toBeTruthy();

		expect(screen.getByRole("link", { name: "English" }).getAttribute("href")).toBe(
			"/tutorials/1-basic/",
		);
		expect(screen.getByRole("link", { name: "日本語" }).getAttribute("href")).toBe(
			"/ja/tutorials/1-basic/",
		);
	});

	test("wires the language button to its popover and preserves the page path", () => {
		renderHeader(new URL("https://example.test/tutorials/1-basic/"));

		const languageButton = screen.getByRole("button", { name: "Change Language" });
		const popoverId = languageButton.getAttribute("popovertarget");
		const popover = document.getElementById(popoverId ?? "");

		expect(popoverId).toBe("lang-popover");
		expect(popover?.getAttribute("popover")).toBe("auto");
		expect(screen.getByRole("link", { name: "English" }).getAttribute("href")).toBe(
			"/tutorials/1-basic/",
		);
		expect(screen.getByRole("link", { name: "日本語" }).getAttribute("href")).toBe(
			"/ja/tutorials/1-basic/",
		);
	});
});
