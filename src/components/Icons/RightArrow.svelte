<script lang="ts">
let { size = 24, color = "currentColor", className = "" }: IconProps = $props();
</script>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  ><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
>
