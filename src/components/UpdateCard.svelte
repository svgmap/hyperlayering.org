<script lang="ts">
import RightArrow from "./Icons/RightArrow.svelte";

interface UpdateCardProps {
	title: string;
	author: string;
	description: string;
	date: Date;
	url: string;
	lang: string;
}

let {
	title,
	author,
	description,
	date,
	url,
	lang = "en",
}: UpdateCardProps = $props();
</script>

<a href={url} aria-label="" class="post-listing" clickable="true">
  <article class="stack">
    <h2 aria-labelledby="" class="title">{title}</h2>
    <p class="description">{description}</p>
    <div class="row details">
      <span class="post-author">{author}</span><span>&#x2022</span>
      <span class="post-date"
        >{date.toLocaleString(lang, { dateStyle: "long" })}</span
      >
      <RightArrow size="1rem" className="details-arrow" />
    </div>
  </article>
</a>

<style>
  .post-listing {
    color: var(--text-primary);
    text-decoration: none;
    padding: var(--space-sm);
    border-radius: var(--round-md);
    transition: background-color var(--timing-normal) ease-out;

    .title {
      margin: 0;
      font-size: var(--font-xl);
      font-width: var(--font-wide);
      font-stretch: var(--font-wide);
      font-weight: bold;
      text-decoration-color: transparent;
      text-underline-offset: var(--space-sm);
      transition:
        color var(--timing-fast),
        text-decoration-color var(--timing-fast),
        text-underline-offset var(--timing-fast);
    }

    .description {
      color: var(--text-secondary);
    }

    .details {
      color: var(--text-tertiary);
      font-size: var(--font-sm);
    }

    &:hover {
      background-color: var(--bg-secondary);
      .title {
        text-decoration: underline solid var(--accent) 2px;
        text-underline-offset: var(--space-xs);
      }
    }
  }
</style>
