import { full as emoji } from "npm:markdown-it-emoji@3";
import anchor from "npm:markdown-it-anchor@9.2.1";

export const markdown = {
  plugins: [emoji, anchor],
};
