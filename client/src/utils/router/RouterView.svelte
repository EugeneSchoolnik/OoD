<script lang="ts">
  import { Router } from "./router";

  const { route } = Router;
  let params = Router.params;
  route.subscribe(() => (params = Router.params));
</script>

<svelte:component this={$route} {params} />
