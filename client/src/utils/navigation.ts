import { go } from "./router/router";

const navigation = () => {
  let q = false;
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 81) q = true;
  });
  document.addEventListener("keyup", (e) => {
    if (e.keyCode == 81) q = false;
    if (e.keyCode == 27) {
      if (q) go("/");
      else {
        const event = new Event("mouseup");
        (event as any).button = 3;
        document.dispatchEvent(event);
      }
    }
  });
};

export default navigation;
