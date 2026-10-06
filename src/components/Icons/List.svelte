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
    ><path d="M16 5H3" /><path d="M16 12H3" /><path d="M16 19H3" /><path
        d="M21 5h.01"
    /><path d="M21 12h.01" /><path d="M21 19h.01" /></svg
>
