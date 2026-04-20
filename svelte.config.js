// STEP 1: SvelteKit configuration.
// adapter-auto picks the correct adapter at build time (Vercel, Netlify, Node, etc.)
// vitePreprocess lets us write <script lang="ts"> inside .svelte files.
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  }
};

export default config;
