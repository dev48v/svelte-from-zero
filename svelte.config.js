// STEP 8: Swap adapter-auto for the explicit Vercel adapter.
// Pinning the adapter guarantees the same build behaviour on CI/Vercel as
// on localhost; adapter-auto warns when it cannot detect a host. runtime
// 'nodejs20.x' matches Vercel's current LTS Node image.
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x'
    })
  }
};

export default config;
