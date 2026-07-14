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
  class={`lucide lucide-menu-icon lucide-menu ${className}`}
  ><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></svg
>
