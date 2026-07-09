<script lang="ts">
import { getRelativeLocaleUrl } from "astro:i18n";
import GitHub from "components/Icons/GitHub.svelte";
import Languages from "components/Icons/Languages.svelte";
import { languages } from "i18n/ui";
import { getLangFromUrl, pathWithoutLocale, useTranslations } from "i18n/utils";

interface HeaderProps {
	title?: string;
	currentUrl: URL;
	links: { href: string; label: string }[];
}

let { title = "HLA", currentUrl, links }: HeaderProps = $props();
let lang = $derived(getLangFromUrl(currentUrl));
let t = $derived(useTranslations(lang));
</script>

<header class="site-header">
  <a
    aria-label="Home"
    class="brand font-wide"
    href={getRelativeLocaleUrl(lang, "/")}>{title}</a
  >
  <nav class="nav">
    {#each links as link}
      <a href={`${link.href}`}>{link.label}</a>
    {/each}
    <button
      aria-label={t("nav.lang-btn.label")}
      name={t("nav.lang-btn.label")}
      class="lang-button icon-wrapper"
      button-type="icon-wrapper"
      popovertarget="lang-popover"><Languages /></button
    >
    <a
      href="https://github.com/svgmap"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("nav.github.message")}
      title={t("nav.github.message")}
      class="github-button"
      role="button"
    >
      <GitHub></GitHub>
    </a>
  </nav>
  <div id="lang-popover" class="card" popover="auto">
    <ul role="list">
      {#each Object.entries(languages) as [code, label]}
        <li>
          <a
            href={`${getRelativeLocaleUrl(code, pathWithoutLocale(currentUrl))}`}
            >{label}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</header>

<style>
  a {
    color: inherit;
    text-decoration: none;
    font-size: var(--text-base);
  }

  a:hover {
    text-decoration: underline;
  }

  .site-header {
    position: sticky;
    top: 0;
    width: 100vw;
    z-index: 1;
    height: var(--header-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-primary);
    color: var(--text-main);
    border-bottom: solid 1px var(--bg-tertiary);
    transition: color var(--timing-normal) ease-out;

    .brand {
      color: inherit;
      text-decoration: none;
      font-size: var(--text-xl);
      font-weight: 700;
    }
  }

  .nav {
    display: flex;
    flex-direction: row;
    gap: var(--space-sm);
    align-items: center;
  }

  .github-button {
    height: fit-content;
    width: fit-content;
    color: var(--text-main);
  }

  .lang-button {
    anchor-name: --lang-button;
  }

  #lang-popover {
    position-anchor: --lang-button;
    top: calc(anchor(--lang-button bottom) + var(--space-md));
    position-area: center bottom;
    transition-property: opacity, display, overlay, transform;
    transition-duration: var(--timing-fast);
    transition-behavior: allow-discrete;
    display: none;
    opacity: 0;

    &:popover-open {
      display: block;
      opacity: 1;
      transform: translateY(0);

      @starting-style {
        opacity: 0;
        transform: translateY(10%);
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding: 0;
    }
    a {
      display: block;
      text-align: center;
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--round-xs);
      &:hover {
        background-color: var(--bg-tertiary);
      }
    }
  }
</style>
