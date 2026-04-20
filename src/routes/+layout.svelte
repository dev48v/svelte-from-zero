<!-- STEP 2: Root layout now mounts the shared Header and a footer.
     Every route renders inside <slot />. Layouts are the Svelte equivalent
     of "wrap every page with this" — no manual import in each +page.svelte. -->
<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main class="container page">
  <slot />
</main>

<footer class="site-footer">
  <div class="container footer-inner">
    <span>Built with SvelteKit + CoinGecko API</span>
    <span class="muted">TechFromZero · Day 19</span>
  </div>
</footer>

<style>
  .page {
    padding: 2rem 1.25rem 4rem;
    min-height: calc(100vh - 140px);
  }
  .site-footer {
    border-top: 1px solid var(--border);
    padding: 1.25rem 0;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
  .footer-inner {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .muted {
    color: var(--text-muted);
  }
</style>
