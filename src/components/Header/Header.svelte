<script lang="ts">
import GitHub from "components/Icons/GitHub.svelte";
import Languages from "components/Icons/Languages.svelte";

interface HeaderProps {
	title?: string;
	currentPath: string;
	links: { href: string; label: string }[];
}

let { title = "HLA", currentPath, links }: HeaderProps = $props();
$inspect(currentPath);
$inspect(links);
</script>

<header class="site-header">
  <div class="brand">
    <a href={`${import.meta.env.BASE_URL}/`}>{title}</a>
  </div>
  <div class="header-nav-group">
    <nav class="site-nav">
      {#each links as link}
        <a href={`${import.meta.env.BASE_URL}${link.href}`}>{link.label}</a>
      {/each}
    </nav>   
    <!-- 
      
    <button class="lang-btn" button-type="icon-wrapper" popovertarget="lang-popover"
      ><Languages /></button
    >
    --> 
    <a
      href="https://github.com/svgmap"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Explore the project on GitHub"
      title="Explore the project on GitHub"
      class="github-btn"
      role="button"
    >
      <GitHub></GitHub>
    </a>
  </div>
</header>

<style scoped>
  @import "../../styles/variables.css";
  .site-header {
    position: fixed;
    width: 100vw;
    z-index: 1;
    height: var(--header-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--bg-primary);
    color: var(--text-main);
    border-bottom: solid 1px var(--bg-tertiary);
  }

  .header-nav-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: var(--spacing-sm);
  }

  a:hover {
    color: var(--text-secondary);
  }

  .brand a {
    color: inherit;
    text-decoration: none;
    font-size: x-large;
    font-weight: 700;
  }

  .site-nav a {
    margin-left: 1rem;
    color: inherit;
    text-decoration: none;
    font-size: large;
  }

  .site-nav a:hover {
    text-decoration: underline;
  }

  .github-btn {
    color: var(--text-main);
  }

  .lang-btn {
    anchor-name: --lang-btn;
  }

  #lang-popover {
    position-anchor: --lang-btn;
    position: absolute;
    top: anchor(top)
  }
</style>
