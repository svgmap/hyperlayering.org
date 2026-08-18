<script lang="ts">
import { getRelativeLocaleUrl } from "astro:i18n";
import Close from "@components/Icons/Close.svelte";
import GitHub from "@components/Icons/GitHub.svelte";
import Languages from "@components/Icons/Languages.svelte";
import Logo from "@components/Icons/Logo.svelte";
import Menu from "@components/Icons/Menu.svelte";
import { languages } from "@i18n/ui";
import {
	getLangFromUrl,
	pathWithoutLocale,
	useTranslations,
} from "@i18n/utils";

interface HeaderProps {
	title?: string;
	currentUrl: URL;
	links: { href: string; label: string }[];
}

let { title = "HLA", currentUrl, links }: HeaderProps = $props();
let lang = $derived(getLangFromUrl(currentUrl));
let t = $derived(useTranslations(lang));

let menuOpen = $state(false);
const toggleMenu = () => {
	menuOpen = !menuOpen;
};
</script>

<header class="site-header">
  <a
    aria-label="Home"
    class="brand font-wide row"
    href={getRelativeLocaleUrl(lang, "/")}
  >
    <Logo></Logo>
    <span class="typemark">{title}</span>
  </a>
  <nav class="nav" class:nav-open={menuOpen} aria-describedby="nav-menu">
    {#each links as link}
      <a class="nav-item" href={link.href}>{link.label}</a>
    {/each}
    <button
      aria-label={t("nav.lang-btn.label")}
      name={t("nav.lang-btn.label")}
      class="lang-button icon-wrapper"
      popovertarget="lang-popover"><Languages /></button
    >
    <a
      href="https://github.com/svgmap"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("nav.github.message")}
      title={t("nav.github.message")}
      class="icon-wrapper"
    >
      <GitHub></GitHub>
    </a>
  </nav>
  <button
    aria-controls="nav-menu"
    aria-expanded={menuOpen}
    class="icon-wrapper mobile-menu-toggle"
    onclick={toggleMenu}
  >
    {#if !menuOpen}
      <Menu></Menu>
    {:else}
      <Close></Close>
    {/if}
  </button>
  <div id="lang-popover" class="card" popover="auto">
    <ul role="list">
      {#each Object.entries(languages) as [code, label]}
        <li>
          <a href={getRelativeLocaleUrl(code, pathWithoutLocale(currentUrl))}
            >{label}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    height: var(--header-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-primary);
    font-size: var(--font-base);
    color: var(--text-main);
    transition: color var(--timing-normal) ease-out;
    border-block-end: 1px solid var(--bg-tertiary);

    .brand {
      color: inherit;
      text-decoration: none;
      align-items: center;
      font-size: var(--font-xl);
      font-weight: 700;
      transition: all var(--timing-fast);
      @media screen and (max-width: 98ch) {
        .typemark {
          display: none;
        }
      }

      &:hover {
        color: var(--accent);
      }
    }

    .mobile-menu-toggle {
      display: none;
      @media screen and (max-width: 98ch) {
        display: block;
        z-index: 2;
      }
    }
  }

  .nav {
    display: flex;
    gap: var(--space-sm);
    align-items: center;

    .nav-item {
      color: inherit;
      text-decoration-color: transparent;
      text-underline-offset: var(--space-sm);
      transition:
        color var(--timing-fast),
        text-decoration-color var(--timing-fast),
        text-underline-offset var(--timing-fast);
      &:hover {
        color: var(--text-secondary);
        text-decoration: underline solid var(--accent) 2px;
        text-underline-offset: var(--space-xs);
      }
    }

    @media screen and (max-width: 98ch) {
      --_mobile-nav-width: 66vw;
      background-color: var(--bg-secondary);
      border-left: solid 1px var(--bg-tertiary);
      padding: var(--space-lg);
      position: absolute;
      top: 0;
      right: 0;
      height: 100vh;
      width: var(--_mobile-nav-width);
      flex-direction: column;
      gap: var(--space-md);
      align-items: start;
      transition-property: opacity, display, transform;
      transition-duration: var(--timing-fast);
      transition-behavior: allow-discrete;
      display: none;
      opacity: 0;

      &.nav-open {
        display: flex;
        opacity: 1;
        transform: translateX(0);

        @starting-style {
          opacity: 0;
          transform: translateX(50%);
        }
      }

      .nav-item {
        font-size: var(--font-xl);
      }
    }
  }

  .lang-button {
    anchor-name: --lang-button;
  }

  #lang-popover {
    position-anchor: --lang-button;
    top: calc(anchor(--lang-button bottom) + var(--space-md));
    right: anchor(--lang-button);
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

    @media screen and (max-width: 98ch) {
      font-size: var(--font-2xl);
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
      color: inherit;
      text-decoration: none;
      padding: var(--space-xs) var(--space-sm);
      border-radius: var(--round-xs);
      &:hover {
        background-color: var(--bg-tertiary);
      }
    }
  }
</style>
