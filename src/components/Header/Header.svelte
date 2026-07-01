<script lang="ts">
import GitHub from "components/Icons/GitHub.svelte";

interface HeaderProps {
	title?: string;
	currentPath: string;
	links: { href: string; label: string }[];
}

let { title = "HLA", currentPath, links }: HeaderProps = $props();
</script>

<header class="site-header">
  <a
    aria-label="Home"
    class="brand font-wide"
    href={`${import.meta.env.BASE_URL}/`}>{title}</a
  >
  <nav class="nav">
    {#each links as link}
      <a href={`${import.meta.env.BASE_URL}${link.href}`}
        >{link.label}</a
      >
    {/each}
    <a
      href="https://github.com/svgmap"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Link to explore the project on GitHub"
      title="Explore the project on GitHub"
      class="github-btn"
      role="button"
    >
      <GitHub></GitHub>
    </a>
  </nav>
  <!-- 
    <button class="lang-btn" button-type="icon-wrapper" popovertarget="lang-popover"
      ><Languages /></button
    >
    -->
</header>

<style>
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

    a:hover {
      color: var(--text-secondary);
    }

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

    a {
      color: inherit;
      text-decoration: none;
      font-size: var(--text-base);
    }
    a:hover {
      text-decoration: underline;
    }
  }

  .github-btn {
    height: fit-content;
    width: fit-content;
    color: var(--text-main);
  }
</style>
