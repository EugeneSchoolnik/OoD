import App from "./App.svelte";
import { Neutralino } from "./neu";

const app = new App({
  target: document.getElementById("app")!,
});

Neutralino.init();
Neutralino.events.on("windowClose", async () => {
  Neutralino.app.exit();
});

export default app;
