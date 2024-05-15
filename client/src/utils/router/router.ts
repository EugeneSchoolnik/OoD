import { writable } from "svelte/store";

export class Router {
  static path = writable<string[]>([]);
  static route = writable<ConstructorOfATypedSvelteComponent | null>(null);
  static routes: { path: string[]; element: ConstructorOfATypedSvelteComponent }[] = [];
  static history: { here: boolean; path: string }[] = [];
  static params: Record<string, string> = {};

  static setPath(path: string, history = true) {
    const value = path.split("/");
    Router.path.set(value);
    if (history) Router.historyPush(path);
    sessionStorage.setItem("history", JSON.stringify(Router.history));
  }

  static goBack() {
    const event = new Event("mouseup");
    (event as any).button = 3;
    document.dispatchEvent(event);
    Router.history.pop();
    sessionStorage.setItem("history", JSON.stringify(Router.history));
  }

  static addRoute(path: string, element: ConstructorOfATypedSvelteComponent) {
    Router.routes.push({ path: path.split("/"), element });
  }

  static defineRoute(path: string[]) {
    let isRoute = false;
    for (const route of Router.routes) {
      Router.params = {};
      if (path.length !== route.path.length) continue;
      let pathMatch = true;

      for (let i = 0; i < path.length; i++) {
        if (route.path[i][0] == ":") {
          Router.params[route.path[i].slice(1)] = path[i];
          continue;
        }
        if (route.path[i] !== path[i]) pathMatch = false;
      }

      if (!pathMatch) continue;
      Router.route.set(route.element);
      isRoute = true;
      break;
    }
    if (!isRoute) Router.route.set(null);
  }

  static watchPath() {
    Router.path.subscribe(Router.defineRoute);
  }

  static useLink(node: HTMLAnchorElement) {
    node.onclick = (e) => {
      e.preventDefault();
      Router.setPath(node.getAttribute("href")!);
    };
  }

  static historyPush(path: string) {
    if (Router.history.length && !Router.history[Router.history.length - 1].here)
      Router.history = Router.history.slice(0, Router.history.findIndex((i) => i.here == true) + 1);

    Router.history.forEach((i) => (i.here = false));
    Router.history.push({ here: true, path });
    if (Router.history.length > 8) Router.history.shift();
  }

  static historyHandler() {
    document.addEventListener("mouseup", (e) => {
      const index = Router.history.findIndex((i) => i.here == true);
      let route;

      if (e.button === 3 && index > 0) route = Router.history[index - 1]; // prev
      else if (e.button === 4 && index < Router.history.length - 1) route = Router.history[index + 1]; // next

      if (!route) return;

      Router.history[index].here = false;
      route.here = true;
      go(route.path, false);
    });
  }
}

setTimeout(() => {
  const history = sessionStorage.getItem("history");
  if (history) {
    Router.history = JSON.parse(history);
    const path = Router.history.find((i) => i.here)!.path;
    go(path, false);
  } else go("/");
});

Router.watchPath();
Router.historyHandler();

export const link = Router.useLink,
  go = Router.setPath,
  goBack = Router.goBack;
