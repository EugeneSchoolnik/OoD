<script lang="ts">
  import { Router } from "./router";

  type children = { path: string; element: ConstructorOfATypedSvelteComponent; children?: children[] };

  export let path: string;
  export let element: ConstructorOfATypedSvelteComponent;
  export let children: children[] = [];

  const addChildren = (path: string, data: children[]) => {
    for (const i of data) {
      const _path = path + i.path;
      Router.addRoute(_path, i.element);
      if (i.children) addChildren(_path, i.children);
    }
  };

  addChildren(path, children);
  Router.addRoute(path, element);
</script>
