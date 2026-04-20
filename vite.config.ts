// STEP 1: Vite config — bundler + dev server used by SvelteKit.
// The sveltekit() plugin wires Svelte compilation, HMR, SSR, and routing.
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
});
