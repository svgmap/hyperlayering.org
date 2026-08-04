<script lang="ts">
import { getRelativeLocaleUrl } from "astro:i18n";
  import { buildTutorialNav } from "../utils/build-nav";

interface NavItem {
	id: string;
	data: {
		title: string;
		[dataProp: string]: unknown;
	};
	[itemProp: string]: unknown;
}

interface DocSidepanelProps {
	items: NavItem[];
	lang: string;
}

let { items, lang }: DocSidepanelProps = $props();
const rootIdRegex = $derived(new RegExp(`/${lang}/[^/]*(/|)$/gm`));
//console.log(buildTutorialNav())
//const parsedItems: NavMenuItem[] = $derived.by(() => {});
</script>

<nav>
  <ul>
    {#each items as item}
      <li>
        <a
          href={getRelativeLocaleUrl(
            lang,
            `tutorials/${item.id.replace(`${lang}/`, "")}`,
          )}
        >
          {item.data.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
