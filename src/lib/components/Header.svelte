<!-- STEP 2: Shared header shown on every route.
     Kept as its own component (not inline in +layout.svelte) so we can drop
     it into future pages, test it in isolation, and let Svelte scope its
     styles — no leaking CSS. -->
<script lang="ts">
  // The home link also resets any detail-page state when clicked.
  // No props needed: the header is intentionally static.
</script>

<header class="site-header">
  <div class="container inner">
    <a href="/" class="brand">
      <span class="logo">🪙</span>
      <span class="name">Crypto<span class="accent">Tracker</span></span>
    </a>
    <nav>
      <a href="/" class="nav-link">Markets</a>
      <a
        href="https://www.coingecko.com"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-link muted"
      >
        Data by CoinGecko ↗
      </a>
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1.25rem;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    font-size: 1.1rem;
  }
  .logo {
    font-size: 1.3rem;
  }
  .accent {
    color: var(--accent);
  }
  nav {
    display: flex;
    gap: 1.25rem;
  }
  .nav-link {
    font-size: 0.95rem;
    opacity: 0.9;
    transition: opacity 0.15s;
  }
  .nav-link:hover {
    opacity: 1;
  }
  .muted {
    color: var(--text-muted);
  }
</style>
