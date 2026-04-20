// STEP 7: Load function now also fetches the 7-day market chart in parallel.
// Promise.all keeps the two requests concurrent instead of waterfalling,
// so the page resolves roughly as fast as the slower of the two calls.
import { error } from '@sveltejs/kit';
import { getCoin, getCoinChart } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  try {
    const [coin, chart] = await Promise.all([
      getCoin(params.id, fetch),
      getCoinChart(params.id, 7, fetch)
    ]);
    return { coin, chart };
  } catch (e) {
    if (e instanceof Error && e.message.includes(' 404 ')) {
      throw error(404, `Coin "${params.id}" not found on CoinGecko.`);
    }
    throw e;
  }
};
