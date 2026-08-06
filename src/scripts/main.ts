import Umbra, { type Options } from "@emrocode/umbra";
import { KeyboardShortcut, ViewTransitions } from "./plugins";
import AOS from "aos";

const options: Partial<Options> = {
  useColorScheme: [
    "oklch(72.864% 0.06786 83.316)",
    "oklch(48.134% 0.06787 73.853)",
  ],
  useStorage: "local",
  usePlugins: [KeyboardShortcut, ViewTransitions],
};

let umb = new Umbra("button[data-umb=true]", options);
console.table(umb.options);

document.addEventListener("DOMContentLoaded", () =>
  AOS.init({
    duration: 400,
    easing: "ease-in-out",
    mirror: true,
  }),
);

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector<HTMLDetailsElement>("#menu");
  const button = document.querySelector<HTMLElement>("#menu__button");

  const closeMenuOnClickOutside = (e: MouseEvent): void => {
    if (!(e.target instanceof Node)) return;
    if (!menu?.contains(e.target) && !button?.contains(e.target)) {
      menu!.open = false;
    }
  };

  document.addEventListener("click", closeMenuOnClickOutside);
});
