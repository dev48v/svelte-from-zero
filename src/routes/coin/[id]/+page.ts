// STEP 6: Load function for the dynamic /coin/[id] route.
// `params.id` is provided by the folder name `[id]` in the route path.
// We throw SvelteKit's `error(404)` when CoinGecko returns a 404 so users
// see a proper Not Found page instead of a blank crash.
import { error } from '@sveltejs/kit';
import { getCoin } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  try {
    const coin = await getCoin(params.id, fetch);
    return { coin };
  } catch (e) {
    // getCoin throws with the original HTTP status baked into the message.
    if (e instanceof Error && e.message.includes(' 404 ')) {
      throw error(404, `Coin "${params.id}" not found on CoinGecko.`);
    }
    throw e;
  }
};
