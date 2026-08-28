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

let updateLinkElement: HTMLAnchorElement | null = $state(null);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
  class="post-listing card stack"
  clickable="true"
  onclick={(e: MouseEvent) => {
    if (updateLinkElement && e.target !== updateLinkElement)
      updateLinkElement.click();
  }}
>
  <a bind:this={updateLinkElement} href={url} class="link-unstyled"
    ><h2 class="title">{title}</h2></a
  >
  <p class="body">{description}</p>
  <div class="row details">
    <p class="post-author">{author}</p>
    <span>&#x2022</span>
    <p class="post-date">
      {date.toLocaleString(lang, { dateStyle: "long" })}
    </p>
    <RightArrow size="1rem" className="details-arrow" />
  </div>
</article>

<style>
  .post-listing {
    color: var(--text-primary);
    text-decoration: none;

    .title {
      margin: 0;
      font-size: var(--font-xl);
      font-width: var(--font-wide);
      font-stretch: var(--font-wide);
      text-decoration-color: transparent;
      text-underline-offset: var(--space-sm);
      transition-behavior: allow-discrete;
      transition:
        color var(--timing-fast),
        text-decoration-color var(--timing-fast),
        text-underline-offset var(--timing-fast);
    }

    :global(.details-arrow) {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateX(-25%);
      transition:
        opacity var(--timing-fast),
        transform var(--timing-fast),
        visibility 0s linear var(--timing-fast);
    }

    &:hover,
    &:focus-within {
      .title {
        text-decoration: underline solid var(--accent) 2px;
        text-underline-offset: var(--space-xs);

        @starting-style {
          text-decoration: transparent;
          text-underline-offset: var(--space-md);
        }
      }
      :global(.details-arrow) {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
        transition:
          opacity var(--timing-fast),
          transform var(--timing-fast),
          visibility 0s;
      }
    }
  }
</style>
