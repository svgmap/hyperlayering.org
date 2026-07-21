<script lang="ts">
import SVGMap from "components/SVGMap.svelte";
import { mount, onDestroy, unmount } from "svelte";

// biome-ignore lint/suspicious/noExplicitAny: <Expected type declarations for unmount()>
let hlaInstance: Record<string, any>;

const injectScript = (doc: Document, src: string) => {
	try {
		new URL(src);
	} catch (err) {
		throw new Error("Script src URL in injectScript() is invalid");
	}

	return new Promise((resolve, reject) => {
		const s = doc.createElement("script");
		s.src = src;
		s.onload = resolve;
		s.onerror = reject;
		doc.head.appendChild(s);
	});
};
</script>

<div class="browser-container">
  <div class="window-dots-wrapper">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
  <div class="window-content">
    <SVGMap></SVGMap>
  </div>
</div>

<style>
  .browser-container {
    border-radius: var(--round-sm);
    background-color: var(--bg-secondary);
    border: solid 7px var(--bg-secondary);
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    outline: solid 1px var(--bg-tertiary);
  }

  .window-dots-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: var(--space-xs);
    gap: var(--space-xs);
    align-content: center;
  }

  .dot {
    height: 12px;
    width: 12px;
    border-radius: 100%;
    background-color: var(--bg-tertiary);
  }

  .window-content {
    flex-grow: 1;
    border-radius: var(--round-sm);
    background: #000;
    overflow: hidden;
  }
</style>
