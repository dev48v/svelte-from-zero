<!-- STEP 1: Root layout. Every route renders inside this component via <slot />.
     A layout is the right place for global chrome (header, footer) and global
     stylesheet imports — it runs once and wraps every page. -->
<script lang="ts">
  // Global styles are imported here so they apply to every route.
  // The `$lib` alias resolves to src/lib via SvelteKit's path aliasing.
  import '../app.css';
</script>

<slot />
