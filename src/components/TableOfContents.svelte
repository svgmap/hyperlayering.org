<script lang="ts">
import { onMount } from "svelte";

interface TocProps {
	label?: string;
	headers: TocItem[];
}

let { label = "On This Page", headers = [] }: TocProps = $props();

let activeId = $state("");
let isContainerWide = $state(false);
let tocOpen = $state(false);
let tocElement = $state<HTMLElement | undefined>();

// Avoids the generated <astro-island> element - looking for the first real DOM element
const getLayoutContainer = (element: HTMLElement) => {
	let parent = element.parentElement;
	while (parent?.matches("astro-island")) parent = parent.parentElement;
	return parent;
};

const getHeaderElements = (headers: TocItem[]) => {
	const headerElements: HTMLElement[] = [];
	headers.forEach((header) => {
		const headerElement = document.getElementById(header.slug);
		if (headerElement) headerElements.push(headerElement);
	});
	return headerElements;
};

onMount(() => {
	let resizeObserver: ResizeObserver | undefined;
	let intersectObserver: IntersectionObserver | undefined;
	let updateViewportState: () => void;

	const container = tocElement && getLayoutContainer(tocElement);
	if (container) {
		// ResizeObserver - Handles small display only features / behavior
		const updateContainerState = (width: number) => {
			isContainerWide = width >= window.innerWidth;
		};

		resizeObserver = new ResizeObserver(([entry]) => {
			updateContainerState(entry.contentRect.width);
		});

		updateViewportState = () => {
			updateContainerState(container.getBoundingClientRect().width);
		};

		resizeObserver.observe(container);
		window.addEventListener("resize", updateViewportState);
		updateViewportState();
		tocOpen = !isContainerWide;
	}

	// Intersection Observer
	const headerElements = getHeaderElements(headers);
	if (headerElements.length) {
		const options = {
			root: document.querySelector("#scrollArea"),
			rootMargin: "0px",
			scrollMargin: "0px",
			threshold: 1.0,
		};

		intersectObserver = new IntersectionObserver(() => {}, options);
	}

	return () => {
		resizeObserver?.disconnect();
		intersectObserver?.disconnect();
		window.removeEventListener("resize", updateViewportState);
	};
});

const closeToc = () => (tocOpen = false);
$inspect(isContainerWide);
</script>

{#if headers.length}
	<nav class="toc" aria-label="Table of contents" data-table-of-contents bind:this={tocElement}>
        <details class="stack toc-wrapper" bind:open={tocOpen}>
            <summary class="font-bold toc-label">{label}</summary>
			<div class="toc-list-wrapper">
				<ol role="list" class="stack">
                {#each headers as header (header.slug)}
                    <li class:subheading={header.depth >= 3} style={`--indent-amount: ${(header.depth - 3) + 1}`}>
                        <a
                            class="link-unstyled"
                            class:active={activeId === header.slug}
                            href={`#${header.slug}`}
                            aria-current={activeId === header.slug ? "location" : undefined}
							onclick={isContainerWide && closeToc}
                        >
                            {header.text}
                        </a>
                    </li>
                {/each}
            	</ol>
			</div>
            
        </details>
	</nav>
{/if}

<style>
	.toc {
		z-index: 1;
		grid-column: 3;
		position: sticky;
		top: calc(var(--header-height) + var(--space-md));
		font-size: var(--font-sm);
		width: 100%;
		max-height: calc(100dvh - (var(--header-height) + (var(--space-md) * 2)));
		border-radius: clamp(0px, calc((100cqi - 100%) * 1e5), var(--round-md));
		@container (width >= 100vw) {
			top: var(--header-height);
		}
	}

	.toc-wrapper {
		background-color: var(--bg-secondary);
		border: 1px solid var(--bg-tertiary);
		border-radius: inherit;
		max-height: inherit;
		width: 100%;
		cursor: pointer;
		gap: 0;
	}

	.toc-list-wrapper {
		padding: 0 var(--space-md);
		padding-block-end: var(--space-sm);
		width: 100%;
		flex-basis: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.toc-label {
		padding: var(--space-sm) var(--space-md);
		width: 100%;
		font-size: var(--font-base);
		margin-bottom: 0;
	}

	.toc ol {
		margin: 0;
		padding: 0;
		gap: 0;
	}

	.toc li {
		border-inline-start: 2px solid var(--bg-tertiary);
	}

	.toc li.subheading {
        --_indent-amount: var(--indent-amount, 1);
		margin-inline-start: calc(var(--space-xs) * var(--_indent-amount));
	}

	.toc a {
		display: inline-block;
		padding: var(--space-xxs) var(--space-xs);
		color: var(--text-tertiary);
		transition: color var(--timing-fast), border-color var(--timing-fast);
	}

	.toc a:hover,
	.toc a.active {
		color: var(--accent);
	}

	.toc li:has(a.active) {
		border-color: var(--accent);
	}
</style>
