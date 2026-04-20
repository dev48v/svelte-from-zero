<!-- STEP 6: Coin detail page.
     Renders the full market snapshot: logo, rank, current price, the three
     change windows (24h / 7d / 30d), supply numbers, all-time high/low,
     volume, and the coin's description. The 7-day chart arrives in STEP 7. -->
<script lang="ts">
  import { formatPrice, formatBigUsd, formatCompact, formatPct } from '$lib/format';
  import Sparkline from '$lib/components/Sparkline.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: coin = data.coin;
  $: md = coin.market_data;
  $: chart = data.chart;
  // STEP 7: colour the sparkline green or red based on the 7-day change so
  // the chart's visual tone agrees with the headline percentage below it.
  $: sparkColour = md.price_change_percentage_7d >= 0 ? 'var(--green)' : 'var(--red)';

  // Strip HTML from the CoinGecko description — they occasionally embed <a> tags.
  // A textarea trick is the shortest XSS-safe HTML strip in the browser.
  function stripHtml(html: string): string {
    if (typeof document === 'undefined') return html.replace(/<[^>]*>/g, '');
    const el = document.createElement('textarea');
    el.innerHTML = html;
    return el.value.replace(/<[^>]*>/g, '');
  }

  // Short ISO → human date for ATH / ATL captions.
  function shortDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  $: description = stripHtml(coin.description.en || '').split('. ').slice(0, 2).join('. ');
</script>

<svelte:head>
  <title>{coin.name} ({coin.symbol.toUpperCase()}) — Crypto Tracker</title>
</svelte:head>

<a href="/" class="back">← All markets</a>

<header class="coin-head">
  <img src={coin.image.large} alt="" width="64" height="64" />
  <div class="titles">
    <div class="name-row">
      <h1>{coin.name}</h1>
      <span class="ticker">{coin.symbol.toUpperCase()}</span>
      <span class="rank">Rank #{coin.market_cap_rank}</span>
    </div>
    <div class="price-row">
      <span class="price">{formatPrice(md.current_price.usd)}</span>
      <span
        class="change {md.price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}"
        title="24 hour change"
      >
        {formatPct(md.price_change_percentage_24h)} <small>24h</small>
      </span>
    </div>
  </div>
</header>

<section class="card chart-card">
  <div class="chart-head">
    <h2>7-day price</h2>
    <span class="chart-change {md.price_change_percentage_7d >= 0 ? 'text-green' : 'text-red'}">
      {formatPct(md.price_change_percentage_7d)}
    </span>
  </div>
  <Sparkline prices={chart.prices} stroke={sparkColour} />
</section>

<section class="card stats">
  <div class="stat">
    <span class="label">Market Cap</span>
    <span class="value">{formatBigUsd(md.market_cap.usd)}</span>
  </div>
  <div class="stat">
    <span class="label">24h Volume</span>
    <span class="value">{formatBigUsd(md.total_volume.usd)}</span>
  </div>
  <div class="stat">
    <span class="label">24h High</span>
    <span class="value">{formatPrice(md.high_24h.usd)}</span>
  </div>
  <div class="stat">
    <span class="label">24h Low</span>
    <span class="value">{formatPrice(md.low_24h.usd)}</span>
  </div>
  <div class="stat">
    <span class="label">Circulating Supply</span>
    <span class="value">{formatCompact(md.circulating_supply)} {coin.symbol.toUpperCase()}</span>
  </div>
  <div class="stat">
    <span class="label">Max Supply</span>
    <span class="value">
      {#if md.max_supply}
        {formatCompact(md.max_supply)} {coin.symbol.toUpperCase()}
      {:else}
        <span class="text-muted">Unlimited</span>
      {/if}
    </span>
  </div>
  <div class="stat">
    <span class="label">7d Change</span>
    <span class="value {md.price_change_percentage_7d >= 0 ? 'text-green' : 'text-red'}">
      {formatPct(md.price_change_percentage_7d)}
    </span>
  </div>
  <div class="stat">
    <span class="label">30d Change</span>
    <span class="value {md.price_change_percentage_30d >= 0 ? 'text-green' : 'text-red'}">
      {formatPct(md.price_change_percentage_30d)}
    </span>
  </div>
  <div class="stat">
    <span class="label">All-Time High</span>
    <span class="value">
      {formatPrice(md.ath.usd)}
      <small class="text-muted">· {shortDate(md.ath_date.usd)}</small>
    </span>
  </div>
  <div class="stat">
    <span class="label">All-Time Low</span>
    <span class="value">
      {formatPrice(md.atl.usd)}
      <small class="text-muted">· {shortDate(md.atl_date.usd)}</small>
    </span>
  </div>
</section>

{#if description}
  <section class="card description">
    <h2>About {coin.name}</h2>
    <p>{description}.</p>
    {#if coin.links.homepage[0]}
      <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer" class="site-link">
        Official site ↗
      </a>
    {/if}
  </section>
{/if}

<style>
  .back {
    display: inline-block;
    margin-bottom: 1.5rem;
    color: var(--text-muted);
    font-size: 0.9rem;
  }
  .back:hover {
    color: var(--accent);
  }
  .coin-head {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    margin-bottom: 2rem;
  }
  .coin-head img {
    border-radius: 50%;
  }
  .name-row {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  h1 {
    margin: 0;
    font-size: 2rem;
  }
  .ticker {
    color: var(--text-muted);
    letter-spacing: 0.05em;
    font-size: 0.95rem;
  }
  .rank {
    background: var(--accent-soft);
    color: var(--accent);
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .price-row {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    margin-top: 0.35rem;
  }
  .price {
    font-size: 1.8rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .change {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .change small {
    color: var(--text-muted);
    font-weight: 400;
    margin-left: 0.25rem;
  }
  .chart-card {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
  }
  .chart-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.75rem;
  }
  .chart-head h2 {
    margin: 0;
    font-size: 1rem;
    letter-spacing: 0.02em;
    color: var(--text-muted);
    text-transform: uppercase;
  }
  .chart-change {
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    padding: 0.25rem;
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .stat .label {
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .stat .value {
    font-size: 1.05rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .description {
    padding: 1.5rem;
    margin-top: 1.5rem;
  }
  .description h2 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
  }
  .description p {
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0 0 0.75rem;
  }
  .site-link {
    color: var(--accent);
    font-size: 0.9rem;
  }
</style>
