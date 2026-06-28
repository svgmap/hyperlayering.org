<script lang="ts">
  interface BlogPostCardProps {
    title: string;
    author: string;
    date: Date;
    url: string;
  }

  let { title, author, date, url }: BlogPostCardProps = $props();
</script>

<a href={url} aria-label="" class="card-wrapper" clickable="true">
  <article class="blog-post-card card stack">
    <h2 aria-labelledby="" class="title">{title}</h2>
    <span class="post-author">{author}</span>
    <span class="post-date">{date.toLocaleString("en-GB", { dateStyle: "short" })}</span>
  </article>
</a>

<style scoped>
  .blog-post-card {
    text-decoration: none;
  }

  .card-wrapper {
    text-decoration: none;
  }
</style>
