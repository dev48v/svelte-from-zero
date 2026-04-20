<!-- STEP 4: One row in the markets table.
     Split into its own component because each row repeats the same layout,
     and extracting it keeps the list page itself small and declarative. -->
<script lang="ts">
  import type { MarketCoin } from '$lib/api';
  import { formatPrice, formatBigUsd, formatPct } from '$lib/format';

  export let coin: MarketCoin;

  // Reactive classes: positive change gets green, negative gets red, null dash.
  $: changeClass =
    coin.price_change_percentage_24h == null
      ? 'text-muted'
      : coin.price_change_percentage_24h >= 0
      ? 'text-green'
      : 'text-red';
</script>

<a class="row" href="/coin/{coin.id}" aria-label="Open {coin.name} detail">
  <span class="rank">#{coin.market_cap_rank}</span>
  <span class="coin">
    <img src={coin.image} alt="" width="24" height="24" loading="lazy" />
    <span class="name">{coin.name}</span>
    <span class="symbol">{coin.symbol.toUpperCase()}</span>
  </span>
  <span class="price">{formatPrice(coin.current_price)}</span>
  <span class={`change ${changeClass}`}>{formatPct(coin.price_change_percentage_24h)}</span>
  <span class="cap">{formatBigUsd(coin.market_cap)}</span>
  <span class="vol">{formatBigUsd(coin.total_volume)}</span>
</a>

<style>
  .row {
    display: grid;
    grid-template-columns: 60px minmax(180px, 1.4fr) 1fr 1fr 1fr 1fr;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--border);
    transition: background 0.12s ease;
  }
  .row:hover {
    background: rgba(239, 68, 68, 0.06);
  }
  .row:last-child {
    border-bottom: none;
  }
  .rank {
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    font-size: 0.85rem;
  }
  .coin {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-width: 0;
  }
  .coin img {
    border-radius: 50%;
  }
  .name {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .symbol {
    color: var(--text-muted);
    font-size: 0.8rem;
    letter-spacing: 0.05em;
  }
  .price,
  .change,
  .cap,
  .vol {
    font-variant-numeric: tabular-nums;
    text-align: right;
  }
  .change {
    font-weight: 600;
  }
  /* Below 720px we hide the lower-priority columns rather than wrapping. */
  @media (max-width: 720px) {
    .row {
      grid-template-columns: 40px minmax(140px, 1.4fr) 1fr 1fr;
      gap: 0.6rem;
      padding: 0.75rem 0.75rem;
    }
    .cap,
    .vol {
      display: none;
    }
  }
</style>
