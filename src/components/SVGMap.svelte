<script lang="ts">
  import { onMount } from "svelte";
  import type { Attachment } from "svelte/attachments";

  // biome-ignore lint/suspicious/noExplicitAny: <mapcanvas type not defined locally>
  let mapcanvas: HTMLDivElement;
  const basePath = import.meta.env.BASE_URL || "/";

  onMount(async () => {
    try {
      const module = await import(
        // @ts-expect-error: importing a remote module without local type declarations
        "https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js"
      );
      const svgMapInstance = module.svgMap || module.default;

      if (!svgMapInstance) {
        throw new Error("SVGMap did not expose an instance");
      }

      // @ts-expect-error: importing a remote module without local type declarations
      window.svgMap = svgMapInstance;

      if (mapcanvas && typeof svgMapInstance.setMapCanvas === "function") {
        svgMapInstance.setMapCanvas(mapcanvas);
      }

      const rect = mapcanvas?.getBoundingClientRect();
      console.log(rect);
      if (mapcanvas && rect && rect.width > 0 && rect.height > 0) {
        svgMapInstance.setMapCanvasSize({
          x: 0,
          y: 0,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }

      if (typeof svgMapInstance.initLoad === "function") {
        svgMapInstance.initLoad();
        const wrapper = document.getElementById("mapCanvasWrapper");
        if (wrapper) {
          wrapper.style.position = "relative";
        }
      }
    } catch (error) {
      console.error("Failed to initialize svgMap:", error);
    }
  });

  const startSVGMapInstance: Attachment<HTMLElement> = (container) => {
    (async () => {
      try {
        const module = await import(
          // @ts-expect-error: importing a remote module without local type declarations
          "https://cdn.jsdelivr.net/gh/svgmap/svgmapjs@latest/SVGMapLv0.1_r18module.js"
        );
        const svgMapInstance = module.svgMap || module.default;

        if (!svgMapInstance) {
          throw new Error("SVGMap did not expose an instance");
        }

        // @ts-expect-error: importing a remote module without local type declarations
        container.svgMap = svgMapInstance;

        if (mapcanvas && typeof svgMapInstance.setMapCanvas === "function") {
          svgMapInstance.setMapCanvas(mapcanvas);
        }

        const rect = mapcanvas?.getBoundingClientRect();
        console.log(rect);
        if (mapcanvas && rect && rect.width > 0 && rect.height > 0) {
          svgMapInstance.setMapCanvasSize({
            x: 0,
            y: 0,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }

        if (typeof svgMapInstance.initLoad === "function") {
          svgMapInstance.initLoad();
          /*
          const wrapper = document.getElementById("mapCanvasWrapper");
          if (wrapper) {
            wrapper.style.position = "relative";
          }
            */
        }
      } catch (error) {
        console.error("Failed to initialize svgMap:", error);
      }
    });
  };

  const GUARDED_EVENTS = [
    "wheel",
    "mousedown",
    "mousemove",
    "mouseup",
    "touchstart",
    "touchmove",
    "touchend",
    "click",
    "contextmenu",
  ] as const;

  const sandboxInputEvents: Attachment<HTMLElement> = (container) => {
    const withinBounds = (e: Event) =>
      e.target instanceof Node && container.contains(e.target);

    const bound = GUARDED_EVENTS.map((type) => {
      const handler = (e: Event) => {
        if (!withinBounds(e)) e.stopImmediatePropagation();
      };
      document.addEventListener(type, handler, { capture: true });
      return { type, handler };
    });

    // Attachment cleanup — runs automatically on unmount / re-run
    return () => {
      for (const { type, handler } of bound) {
        document.removeEventListener(type, handler, { capture: true });
      }
    };
  };
</script>

<svelte:head>
  <script src="https://unpkg.com/jsts@1.6.1/dist/jsts.min.js"></script>
</svelte:head>

  <div
    {@attach startSVGMapInstance}
    bind:this={mapcanvas}
    id="mapcanvas"
    data-src={`${basePath}Container.svg`}
    title={`${basePath}Container.svg`}
  >
    <div id="gui">
      <!-- svelte-ignore a11y_missing_attribute -->
      <img id="centerSight" style="opacity:0.5" />
    </div>
  </div>


<style>
  #mapCanvasWrapper {
    position: relative;
  }

  #mapcanvas {
    max-width: 100%;
    max-height: 100%;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative !important;
    overflow: hidden;
    overscroll-behavior: contain; /* stop scroll-chaining to the page */
    touch-action: none; /* stop native touch panning from leaking out on mobile */
  }

  #centerSight {
    height: 15px;
    width: 15px;
  }
</style>
