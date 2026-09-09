<script lang="ts">
interface TocProps {
	label?: string;
	headers: TocItem[];
}

let { label = "On This Page", headers = [] }: TocProps = $props();

let activeId = $state("");
</script>

{#if headers.length}
	<nav class="toc" aria-label="Table of contents" data-table-of-contents>
        <details class="stack toc-wrapper">
            <summary class="font-bold toc-label font-wide">{label}</summary>
            <ol role="list" class="stack">
                {#each headers as header (header.slug)}
                    <li class:subheading={header.depth >= 3} style={`--indent-amount: ${(header.depth - 3) + 1}`}>
                        <a
                            class="link-unstyled"
                            class:active={activeId === header.slug}
                            href={`#${header.slug}`}
                            aria-current={activeId === header.slug ? "location" : undefined}
                        >
                            {header.text}
                        </a>
                    </li>
                {/each}
            </ol>
        </details>
	</nav>
{/if}

<style>
	.toc {
		grid-column: 3;
		position: sticky;
		display: flex;
		top: calc(var(--header-height) + var(--space-md));
        font-size: var(--font-sm);
        background-color: var(--bg-primary);
		width: 100%;
		height: fit-content;
		max-height: calc(100vh - (var(--header-height) + (var(--space-md) * 2)));
		border-radius: var(--round-md);

		details {
			width: 100%;
			height: auto;
			cursor: pointer;
		}

		&:has(> details:open) {
			background-color: var(--bg-secondary);
		}
	}

	.toc-label {
		padding: var(--space-sm) var(--space-md);
		width: 100%;
		font-size: var(--font-base);
		margin-bottom: 0;
	}

	.toc ol {
		gap: 0;
		padding: 0 var(--space-md);
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
