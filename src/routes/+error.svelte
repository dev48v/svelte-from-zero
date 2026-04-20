<!-- STEP 8: Global error page.
     Rendered automatically by SvelteKit when any load function throws an
     `error(status, message)`. Keeps the ugly default error screen out of
     production and links the user back home. -->
<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Error {$page.status} — Crypto Tracker</title>
</svelte:head>

<div class="wrap">
  <div class="code">{$page.status}</div>
  <h1>{$page.status === 404 ? 'Coin not found' : 'Something went wrong'}</h1>
  <p>{$page.error?.message || 'Try again in a moment.'}</p>
  <a href="/" class="home">Back to markets →</a>
</div>

<style>
  .wrap {
    max-width: 520px;
    margin: 4rem auto;
    padding: 2rem;
    text-align: center;
  }
  .code {
    font-size: 4rem;
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
  }
  h1 {
    margin: 0.5rem 0;
    font-size: 1.5rem;
  }
  p {
    color: var(--text-muted);
  }
  .home {
    display: inline-block;
    margin-top: 1.5rem;
    padding: 0.6rem 1.1rem;
    background: var(--accent);
    color: #0f172a;
    border-radius: var(--radius);
    font-weight: 700;
  }
</style>
