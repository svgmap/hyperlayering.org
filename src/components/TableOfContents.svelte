<script lang="ts">
  import { onMount } from "svelte";

interface TocProps {
	label?: string;
	headers: TocItem[];
}

let { label = "On This Page", headers = [] }: TocProps = $props();

let activeId = $state("");
let tocOpen = $state(false);

const closeToc = () => tocOpen = false;
$inspect(tocOpen);
</script>

{#if headers.length}
	<nav class="toc" aria-label="Table of contents" data-table-of-contents>
        <details class="stack toc-wrapper" bind:open={tocOpen}>
            <summary class="font-bold toc-label font-wide">{label}</summary>
			<div class="toc-list-wrapper">
				<ol role="list" class="stack">
                {#each headers as header (header.slug)}
                    <li class:subheading={header.depth >= 3} style={`--indent-amount: ${(header.depth - 3) + 1}`}>
                        <a
                            class="link-unstyled"
                            class:active={activeId === header.slug}
                            href={`#${header.slug}`}
                            aria-current={activeId === header.slug ? "location" : undefined}
							onclick={closeToc}
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
		z-index: 2;
		grid-column: 3;
		position: sticky;
		display: flex;
		top: calc(var(--header-height) + var(--space-md));
		font-size: var(--font-sm);
		background-color: var(--bg-primary);
		width: 100%;
		max-height: calc(75vh - (var(--header-height) + (var(--space-md) * 2)));
		border-radius: var(--round-md);

		@container content-body (width <= calc(var(--paragraph-width) * 2)) {
			background-color: var(--bg-secondary);
			border-radius: 0;
			top: var(--header-height);
		}

		details {
			width: 100%;
			cursor: pointer;
			gap: 0;
		}

		&:has(> details:open) {
			background-color: var(--bg-secondary);
		}
	}

	.toc-list-wrapper {
		padding: 0;
		width: 100%;
		max-height: max(40vh, auto);
		overflow-y: auto;
		overflow-x: hidden;
	}

	.toc-label {
		padding: var(--space-sm) var(--space-md);
		@container content-body (width <= calc(var(--paragraph-width) * 2)) {
			padding-block: var(--space-xxs);
		}
		width: 100%;
		font-size: var(--font-base);
		margin-bottom: 0;
	}

	.toc details {
		overflow: hidden;
	}

	.toc ol {
		margin: 0;
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
