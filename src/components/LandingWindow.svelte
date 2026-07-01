<script lang="ts">
</script>

<div class="browser-container">
    <div class="window-dots-wrapper">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
    <div class="window-content">
    </div>
</div>

<style>
    @import "../styles/variables.css";
    .browser-container {
        border-radius: var(--round-sm);
        background-color: var(--bg-secondary);
        border: solid 7px var(--bg-secondary);
        height: 100%;
        display: flex;
        flex-direction: column;
        outline: solid 1px var(--bg-tertiary);
        flex-grow: 1;
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
    }
</style>