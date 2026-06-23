<script lang="ts">
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
    <a href="/">{title}</a>
  </div>
  <nav class="site-nav">
    {#each links as link}
      <a href={link.href}>{link.label}</a>
    {/each}
  </nav>
</header>

<style scoped>
  @import "../../styles/variables.css";
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--bg-primary);
    color: var(--text-main);
    border-bottom: solid 1px var(--bg-tertiary);
  }

  a:hover {
    color: var(--text-secondary);
  }

  .brand a {
    color: inherit;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .site-nav a {
    margin-left: 1rem;
    color: inherit;
    text-decoration: none;
    font-size: 0.95rem;
  }

  .site-nav a:hover {
    text-decoration: underline;
  }
</style>
