// STEP 3: Typed client for the CoinGecko public API.
// All network calls live in this one file so pages stay pure — they only
// know about the three exported functions and their response shapes.
// CoinGecko's free tier needs no API key; we only hit /api/v3/*.

const BASE = 'https://api.coingecko.com/api/v3';

// ---------- response shapes ----------

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number | null;
  // 7-day inline sparkline — optional because we only request it on the home list.
  sparkline_in_7d?: { price: number[] };
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: { large: string; small: string };
  market_cap_rank: number;
  description: { en: string };
  links: { homepage: string[] };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: { usd: number };
    ath_date: { usd: string };
    atl: { usd: number };
    atl_date: { usd: string };
  };
}

export interface MarketChart {
  // Each point is [unix_ms_timestamp, price_in_usd].
  prices: [number, number][];
}

// ---------- internal fetch helper ----------

// Centralises error handling so every caller gets the same behaviour:
// non-2xx throws with a readable message, JSON is parsed once, and the
// fetch impl is injected so SvelteKit load functions can pass its own
// fetch (enables request deduping + cookie forwarding on the server).
async function request<T>(path: string, fetchImpl: typeof fetch = fetch): Promise<T> {
  const res = await fetchImpl(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`CoinGecko ${res.status} on ${path}`);
  }
  return (await res.json()) as T;
}

// ---------- public API ----------

/** Top N coins by market cap, with optional 7-day sparkline inlined. */
export function getTopCoins(limit = 50, fetchImpl?: typeof fetch): Promise<MarketCoin[]> {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: String(limit),
    page: '1',
    sparkline: 'true',
    price_change_percentage: '24h'
  });
  return request<MarketCoin[]>(`/coins/markets?${params}`, fetchImpl);
}

/** Full profile + market snapshot for one coin by id (e.g. "bitcoin"). */
export function getCoin(id: string, fetchImpl?: typeof fetch): Promise<CoinDetail> {
  // localization=false trims a ~200 KB payload we don't render.
  return request<CoinDetail>(
    `/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
    fetchImpl
  );
}

/** Historical price points. `days` accepts 1, 7, 14, 30, 90, 180, 365, max. */
export function getCoinChart(
  id: string,
  days: number | 'max' = 7,
  fetchImpl?: typeof fetch
): Promise<MarketChart> {
  return request<MarketChart>(
    `/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    fetchImpl
  );
}
