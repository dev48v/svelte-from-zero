<!-- STEP 4: Home page — renders the top 50 coins table.
     Data arrives pre-fetched from +page.ts via the `data` prop, so the
     first paint already has coins. Search + sparkline come in later steps. -->
<script lang="ts">
  import CoinRow from '$lib/components/CoinRow.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
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

<div class="card table">
  <div class="header-row">
    <span>#</span>
    <span>Coin</span>
    <span class="num">Price</span>
    <span class="num">24h %</span>
    <span class="num cap">Market Cap</span>
    <span class="num vol">Volume</span>
  </div>
  {#each data.coins as coin (coin.id)}
    <CoinRow {coin} />
  {/each}
</div>

<style>
  .hero {
    margin-bottom: 2rem;
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
