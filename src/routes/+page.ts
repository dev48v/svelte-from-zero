// STEP 4: Load function for the home route.
// A "+page.ts" exports a `load()` that runs BEFORE the component renders.
// SvelteKit passes us its own fetch, which dedupes identical requests and
// forwards cookies when running on the server, so we hand it straight to
// the api client.
import { getTopCoins } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const coins = await getTopCoins(50, fetch);
  return { coins };
};
