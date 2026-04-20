<!-- STEP 5: Home page with client-side search.
     All 50 coins are already in memory (fetched once by the load function),
     so filtering is pure JavaScript — no extra API call per keystroke. The
     reactive `$:` block recomputes `filtered` whenever `query` or
     `data.coins` changes. -->
<script lang="ts">
  import CoinRow from '$lib/components/CoinRow.svelte';
  import SearchBox from '$lib/components/SearchBox.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let query = '';

  // Normalise once per keystroke — match on coin name OR ticker symbol.
  // Case-insensitive; whitespace-only queries fall through to "show all".
  $: needle = query.trim().toLowerCase();
  $: filtered = needle
    ? data.coins.filter(
        (c) => c.name.toLowerCase().includes(needle) || c.symbol.toLowerCase().includes(needle)
      )
    : data.coins;
</script>

<svelte:head>
  <title>Crypto Markets — Top 50 by Market Cap</title>
</svelte:head>

<section class="hero">
  <h1>Live Crypto Markets</h1>
  <p class="lede">
    Top 50 coins ranked by market cap. Prices, 24h change and volume pulled live from the
    <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer">CoinGecko</a>
    public API — no login, no key.
  </p>
</section>

<div class="toolbar">
  <SearchBox bind:value={query} />
  <span class="count">{filtered.length} of {data.coins.length}</span>
</div>

<div class="card table">
  <div class="header-row">
    <span>#</span>
    <span>Coin</span>
    <span class="num">Price</span>
    <span class="num">24h %</span>
    <span class="num cap">Market Cap</span>
    <span class="num vol">Volume</span>
  </div>
  {#each filtered as coin (coin.id)}
    <CoinRow {coin} />
  {:else}
    <p class="empty">No coins match "{query}". Try a different name or ticker.</p>
  {/each}
</div>

<style>
  .hero {
    margin-bottom: 1.5rem;
  }
  h1 {
    margin: 0 0 0.5rem;
    font-size: 2rem;
    letter-spacing: -0.01em;
  }
  .lede {
    color: var(--text-muted);
    max-width: 65ch;
    line-height: 1.55;
    margin: 0;
  }
  .lede a {
    color: var(--accent);
  }
  .toolbar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .toolbar :global(.search) {
    flex: 1;
    max-width: 420px;
  }
  .count {
    color: var(--text-muted);
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }
  .table {
    overflow: hidden;
  }
  .header-row {
    display: grid;
    grid-template-columns: 60px minmax(180px, 1.4fr) 1fr 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0.9rem 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid var(--border);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }
  .num {
    text-align: right;
  }
  .empty {
    padding: 2rem;
    text-align: center;
    color: var(--text-muted);
    margin: 0;
  }
  @media (max-width: 720px) {
    .header-row {
      grid-template-columns: 40px minmax(140px, 1.4fr) 1fr 1fr;
      gap: 0.6rem;
      padding: 0.75rem;
    }
    .cap,
    .vol {
      display: none;
    }
  }
</style>
