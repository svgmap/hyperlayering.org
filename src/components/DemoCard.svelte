<script lang="ts">
interface DemoCardProps {
	imageUrl: string;
	title: string;
	url: string;
}

let { imageUrl, title, url }: DemoCardProps = $props();
</script>

<a href={url} class="card-wrapper" clickable="true">
  <article class="card stack">
    <img alt={`Image for the ${title} demo page`} src={imageUrl}  class="image" />
    <h2 class="title">{title}</h2>
  </article>
</a>

<style scoped>
  .card-wrapper {
    text-decoration: none;
  }
</style>
