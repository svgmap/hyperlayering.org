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
  class="post-listing stack"
  onclick={(e: MouseEvent) => {
    console.log("test")
    if(updateLinkElement && e.target !== updateLinkElement) {
      
      updateLinkElement.click();
    }
  }}
>
  <a bind:this={updateLinkElement} href={url} class="link-unstyled"
    ><h2 class="title">{title}</h2></a
  >
  <p class="description">{description}</p>
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
    padding: var(--space-sm);
    border-radius: var(--round-md);
    transition: background-color var(--timing-normal) ease-out;
    cursor: pointer;

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

    :global(.details-arrow) {
      transition-property: opacity, display, transform;
      transition-duration: var(--timing-fast);
      transition-behavior: allow-discrete;
      display: none;
      opacity: 0;
    }

    &:hover, &:focus-within {
      background-color: var(--bg-secondary);
      .title {
        text-decoration: underline solid var(--accent) 2px;
        text-underline-offset: var(--space-xs);
      }
      :global(.details-arrow) {
        display: block;
        opacity: 1;
        transform: translateX(0);

        @starting-style {
          opacity: 0;
          transform: translateX(-25%);
        }
      }
    }
  }
</style>
