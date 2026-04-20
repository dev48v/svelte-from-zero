<!-- STEP 5: Controlled search input.
     Svelte's `bind:value` wires the DOM value back to the parent's prop —
     no onChange handler needed. We keep the UI concern (icon, styling,
     aria-label) here and leave the filtering logic to the parent. -->
<script lang="ts">
  export let value = '';
  export let placeholder = 'Search by name or symbol…';
</script>

<label class="search">
  <span class="icon" aria-hidden="true">🔎</span>
  <input
    type="search"
    bind:value
    {placeholder}
    aria-label="Filter coins"
    autocomplete="off"
    spellcheck="false"
  />
  {#if value}
    <button type="button" class="clear" on:click={() => (value = '')} aria-label="Clear search">
      ×
    </button>
  {/if}
</label>

<style>
  .search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--bg-elev);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.6rem 0.85rem;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .search:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }
  .icon {
    opacity: 0.6;
  }
  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 0.95rem;
    min-width: 0;
  }
  input::placeholder {
    color: var(--text-muted);
  }
  .clear {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1.4rem;
    line-height: 1;
    padding: 0 0.25rem;
  }
  .clear:hover {
    color: var(--text);
  }
</style>
