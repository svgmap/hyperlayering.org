<script lang="ts">
  interface HeaderProps {
    title?: string;
    links: { href: string, label: string }[];
  }

  let { title = "HLA", links }: HeaderProps = $props()
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

<style>
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--header-bg, #0f172a);
    color: var(--header-fg, #f8fafc);
  }

  .brand a {
    color: inherit;
    text-decoration: none;
    font-size: 1.25rem;
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
