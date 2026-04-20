<!-- STEP 1: Home page placeholder.
     The "+page.svelte" filename is how SvelteKit maps routes — this file
     becomes the "/" route. We'll swap this placeholder for the real coin
     list UI in STEP 4. -->
<script lang="ts">
  const step = 1;
</script>

<svelte:head>
  <title>Crypto Price Tracker</title>
</svelte:head>

<main>
  <h1>Crypto Price Tracker</h1>
  <p>Step {step} — SvelteKit scaffold ready. Home page wiring comes next.</p>
</main>

<style>
  main {
    padding: 2rem;
    max-width: 960px;
    margin: 0 auto;
  }
  h1 {
    margin: 0 0 0.5rem;
  }
</style>
