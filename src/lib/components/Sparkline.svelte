<!-- STEP 7: Zero-dependency SVG price chart.
     We receive an array of [timestamp, price] tuples and draw them as one
     <polyline>. The path is auto-scaled to the viewBox, so the same SVG
     fills any container without a chart library — ~30 lines of real logic. -->
<script lang="ts">
  export let prices: [number, number][]; // [ [ms, usd], ... ]
  export let width = 800;
  export let height = 220;
  export let stroke = 'var(--accent)';

  // Left/right/top/bottom padding inside the viewBox so the line is not
  // clipped at the edges and the high/low labels have room.
  const padX = 36;
  const padY = 20;

  // Reactive: recompute points + axis labels whenever `prices` changes.
  // Guard against empty arrays so the chart renders a graceful message
  // when CoinGecko hiccups and returns zero points.
  $: values = prices.map((p) => p[1]);
  $: min = values.length ? Math.min(...values) : 0;
  $: max = values.length ? Math.max(...values) : 0;
  $: span = max - min || 1; // avoid /0 when a coin was flat for 7 days

  // Convert a single data point to SVG coordinates.
  // Y is inverted because SVG's origin is top-left.
  function toXY(idx: number, val: number): string {
    const x = padX + ((width - padX * 2) * idx) / Math.max(prices.length - 1, 1);
    const y = padY + (height - padY * 2) * (1 - (val - min) / span);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }

  $: polyPoints = prices.map((p, i) => toXY(i, p[1])).join(' ');

  // Closed polygon underneath the line for the gradient fill effect.
  $: areaPoints = prices.length
    ? `${padX},${height - padY} ${polyPoints} ${width - padX},${height - padY}`
    : '';

  // Short USD formatter for the axis captions — chart.js would need a plugin,
  // here it's a two-line function.
  function money(n: number): string {
    if (n >= 1000) return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (n >= 1) return '$' + n.toFixed(2);
    return '$' + n.toPrecision(3);
  }
</script>

<div class="chart-wrap">
  {#if prices.length > 1}
    <svg viewBox="0 0 {width} {height}" preserveAspectRatio="none" role="img" aria-label="7-day price chart">
      <!-- Gradient fill under the line — defined inline so the component is self-contained. -->
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color={stroke} stop-opacity="0.35" />
          <stop offset="100%" stop-color={stroke} stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Horizontal guide at the mid price. -->
      <line
        x1={padX}
        x2={width - padX}
        y1={height / 2}
        y2={height / 2}
        stroke="var(--border)"
        stroke-dasharray="4 6"
      />

      <polygon points={areaPoints} fill="url(#sparkFill)" />
      <polyline
        points={polyPoints}
        fill="none"
        stroke={stroke}
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />

      <!-- Axis labels: high at the top, low at the bottom. -->
      <text x="4" y={padY + 4} class="axis">{money(max)}</text>
      <text x="4" y={height - padY + 4} class="axis">{money(min)}</text>
    </svg>
  {:else}
    <p class="empty">No chart data returned for this coin.</p>
  {/if}
</div>

<style>
  .chart-wrap {
    width: 100%;
    aspect-ratio: 800 / 220;
  }
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  .axis {
    fill: var(--text-muted);
    font-size: 11px;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  }
  .empty {
    color: var(--text-muted);
    text-align: center;
    padding: 2rem 1rem;
  }
</style>
