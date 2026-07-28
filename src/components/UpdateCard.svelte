<script lang="ts">
interface BlogPostCardProps {
	title: string;
	author: string;
	date: Date;
	url: string;
}

let { title, author, date, url }: BlogPostCardProps = $props();
</script>

<a href={url} aria-label="" class="post-listing" clickable="true">
  <article class="stack">
    <span aria-labelledby="" class="title">{title}</span>
    <hr>
    <span class="post-author">{author}</span>
    <span class="post-date">{date.toLocaleString("en-GB", { dateStyle: "short" })}</span>
  </article>
</a>

<style scoped>

  .post-listing {
    color: var(--text-secondary);
    text-decoration: none;
    padding: var(--space-sm);
    border-radius: var(--round-md);
    transition: background-color var(--timing-normal) ease-out;

    .title {
      font-size: var(--text-xl);
      font-weight: bold;
    }

    &:hover {
      background-color: var(--bg-secondary);
      .title {
        text-decoration: underline;
      }
    }
  }
  
</style>
