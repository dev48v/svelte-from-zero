// STEP 3: Formatting helpers used by every view.
// Kept separate from api.ts so the API module stays pure data, and the view
// layer stays free of inline number-formatting boilerplate.

const nf = (opts: Intl.NumberFormatOptions) => new Intl.NumberFormat('en-US', opts);

const usdLarge = nf({ style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const usdSmall = nf({ style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
const usdTiny = nf({ style: 'currency', currency: 'USD', maximumFractionDigits: 6 });
const pct = nf({ style: 'percent', maximumFractionDigits: 2, signDisplay: 'exceptZero' });
const compact = nf({ notation: 'compact', maximumFractionDigits: 2 });

/** Prices switch precision by magnitude so memecoins ($0.00001) and BTC both render cleanly. */
export function formatPrice(value: number | null | undefined): string {
  if (value == null) return '—';
  if (value >= 1) return usdSmall.format(value);
  if (value >= 0.01) return usdTiny.format(value);
  return usdTiny.format(value);
}

/** Market cap + volume: compact notation keeps tables tidy ($2.3T instead of $2,340,000,000,000). */
export function formatBigUsd(value: number | null | undefined): string {
  if (value == null) return '—';
  return '$' + compact.format(value);
}

/** Circulating / total supply — compact, no currency symbol. */
export function formatCompact(value: number | null | undefined): string {
  if (value == null) return '—';
  return compact.format(value);
}

/** 24h % change. Intl divides by 100, so we pass the ratio. Also handles null. */
export function formatPct(value: number | null | undefined): string {
  if (value == null) return '—';
  return pct.format(value / 100);
}

/** Large whole-dollar figures when we want comma-separated not compact form. */
export function formatUsd(value: number | null | undefined): string {
  if (value == null) return '—';
  return usdLarge.format(value);
}
