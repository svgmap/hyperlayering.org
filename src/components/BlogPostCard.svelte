<script lang="ts">
  interface BlogPostCardProps {
    title: string;
    author: string;
    date: string;
    url: string;
  }

  let { title, author, date, url }: BlogPostCardProps = $props();
</script>

<a href={url} aria-label="">
  <article class="blog-post--card">
    <h2 aria-labelledby="" class="post-title">{title}</h2>
    <span class="post-author">{author}</span>
    <span class="post-date">{date}</span>
  </article>
</a>

<style scoped>
  .blog-post-card {
    
  }

  .card-wrapper {

  }
</style>
