<script lang="ts">
import { onMount } from "svelte";
import { slide } from "svelte/transition";
import Close from "./Icons/Close.svelte";
import List from "./Icons/List.svelte";

interface TocProps {
	label?: string;
	headers: Map<string, TocItem>;
}

let { label = "On This Page", headers = new Map() }: TocProps = $props();

const headerHeight = 68;
$inspect(headers);

let activeHeaderId = $state<string | null>(null);
let isContainerWide = $state(false);
let tocOpen = $state(false);
$inspect(tocOpen);
let tocElement = $state<HTMLElement | undefined>();

const closeToc = () => {
	if (!isContainerWide) return;
	tocOpen = false;
};

// Avoids the generated <astro-island> element - looking for the first real DOM element
const getLayoutContainer = (element: HTMLElement) => {
	let parent = element.parentElement;
	while (parent?.matches("astro-island")) parent = parent.parentElement;
	return parent;
};

const getHeaderElements = (headers: MapIterator<TocItem>) => {
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

	// ResizeObserver - Handles small display only features / behavior
	const container = tocElement && getLayoutContainer(tocElement);
	if (container) {
		const updateContainerState = (width: number) => {
			isContainerWide = Math.round(width) >= window.innerWidth;
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
	const headerElements = getHeaderElements(headers.values());
	if (headerElements.length) {
		const options = {
			root: null,
			rootMargin: `-${headerHeight}px 0px 0px 0px`,
			scrollMargin: "0px",
			threshold: 0,
		};

		const callback = (entries: IntersectionObserverEntry[]) => {
			let highestIndex = 0;
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeHeaderId = entry.target.id;
				}
			});
		};

		intersectObserver = new IntersectionObserver(callback, options);
		headerElements.forEach((headerElement) => {
			intersectObserver?.observe(headerElement);
		});
	}

	return () => {
		resizeObserver?.disconnect();
		intersectObserver?.disconnect();
		window.removeEventListener("resize", updateViewportState);
	};
});
</script>

<svelte:window
	onkeydown={(e) => e.key === "Escape" && closeToc()}
	onclick={(e) => {
		if (isContainerWide && tocElement && !tocElement.contains(e.target as Node)) closeToc();
	}}

	onscrollcapture={(e) => {
		if (isContainerWide && tocElement && !tocElement.contains(e.target as Node)) closeToc();
	}}
/>

{#if headers.size}
	<nav
		class="toc"
		aria-label="Table of contents"
		data-table-of-contents
		bind:this={tocElement}
	>
		{#if !isContainerWide} 
			<div class="toc-label font-bold">{label}</div>
		{:else} 
			<button 
				onclick={() => (tocOpen = !tocOpen)}
				class="toc-toggle-btn row row--xs font-bold" 
				popovertarget="toc-dropdown"
				aria-expanded={tocOpen}
				aria-controls="toc-list"
			>
				{#if !tocOpen}
				<List size={"1em"}/>
				{:else}
				<Close size={"1em"}/>
				{/if}
				{label}
			</button>
		{/if}
		
		{#if !isContainerWide || (isContainerWide && tocOpen)}
		<ol
			id={isContainerWide ? "toc-dropdown" : undefined}
			role="list"
			class="stack"
			class:dropdown={isContainerWide}
			transition:slide
		>
			{#each headers.values() as header (header.slug)}
				<li
					class:active={activeHeaderId === header.slug}
					class:subheading={header.depth >= 3}
					style={`--indent-amount: ${header.depth - 3 + 1}`}
				>
					<a
						class="link-unstyled"
						href={`#${header.slug}`}
						onclick={closeToc}
					>
						{header.text}
					</a>
				</li>
			{/each}
		</ol>
		{/if}
	</nav>
{/if}

<style>
	.toc {
		z-index: 1;
		grid-column: 3;
		position: sticky;
		top: calc(var(--header-height) + var(--space-md));
		font-size: var(--font-sm);
		margin-inline-start: auto;
		width: min(30ch, 100%);
		overflow-y: auto;
		max-height: calc(
			100dvh - (var(--header-height) + var(--space-md))
		);

		@container (width >= 100vw) {
			top: var(--header-height);
			width: 100%;
			overflow: visible;
			outline: 1px solid var(--bg-tertiary);
		}
	}

	.toc-label {
		padding: var(--space-xs) 0;
		width: 100%;
		font-size: var(--font-base);
		margin-bottom: 0;
		position: sticky;
		top: 0;
		background: linear-gradient(to bottom, var(--bg-primary) 85%, rgba(0, 0, 0, 0) 100%);
	}

	.toc-toggle-btn {
		z-index: 3;
		cursor: pointer;
		width: 100%;
		padding: var(--space-xs) var(--space-md);
		font-size: var(--font-base);
		border-radius: 0;
		border: none;
		background-color: var(--bg-secondary);
		anchor-name: --toc-toggle-btn;
		transition-property: background-color;
		transition-duration: var(--timing-fast);

		&:hover {
			background-color: var(--bg-tertiary);
		}
	}

	.toc ol {
		margin: 0;
		padding: 0;
		gap: 0;

		&.dropdown {
			position: absolute;
			position-anchor: --toc-toggle-btn;
			inset: auto;
			margin: 0;
			top: anchor(bottom);
			left: anchor(left);
			width: anchor-size(width);
			padding: var(--space-xs) var(--space-md);
			background-color: var(--bg-secondary);
			max-height: calc(70svh - (anchor-size(height) + var(--header-height)));
			overflow-y: auto;
		}
	}

	.toc li {
		border-inline-start: 2px solid var(--bg-tertiary);
		transition-property: border-color;
		transition-duration: var(--timing-fast);
		&.active {
			border-color: var(--accent);
		}
	}

	.toc li.subheading {
		--_indent-amount: var(--indent-amount, 1);
		padding-inline-start: calc(var(--space-sm) * var(--_indent-amount));
	}

	.toc a {
		display: inline-block;
		padding: var(--space-xxs) var(--space-xs);
		color: var(--text-tertiary);
		transition:
			color var(--timing-fast),
			border-color var(--timing-fast);
	}

	.toc a:hover {
		color: var(--accent);
	}
</style>
