<script lang="ts">
import { getLangFromUrl, useTranslations } from "@i18n/utils";

type LinkGroup = {
	groupLabel: string;
	links: {
		label: string;
		href: string;
	}[];
};

interface FooterProps {
	linkGroups: LinkGroup[];
	currentUrl: URL;
}

let { currentUrl, linkGroups }: FooterProps = $props();

let lang = $derived(getLangFromUrl(currentUrl));
let t = $derived(useTranslations(lang));
</script>

<footer class="site-footer stack stack--sm">
    <section class="link-grid">
        {#each linkGroups as linkGroup}
            <article>
            <h2 class="section-header">{linkGroup.groupLabel}</h2>
            <ul role="list">
            {#each linkGroup.links as link}
                <li><a href={link.href}>{link.label}</a></li>        
            {/each}
            </ul>
        </article>
        {/each}
    </section>
    <hr/>
    <small class="copyright">&#169; 2026 <span translate="no">SVGMap Organization</span></small>
</footer>

<style>
    .site-footer {
        margin: var(--space-sm) auto;
	    margin-inline: var(--space-md);
        background-color: var(--bg-secondary);
        padding: var(--space-md);
        border-radius: var(--round-md);

        .copyright {
            margin: 0; 
            color: var(--text-tertiary);
        }
    }

    .link-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: var(--space-md);

        .section-header {
            font-size: var(--font-base);
            margin: 0;
        }

        a {
            color: var(--text-tertiary);
            font-size: var(--font-sm);
            &:hover {
                color: var(--text-secondary);
            }
        }

        ul {
            padding-inline-start: 0;
        }
    }

</style>