import { full as emoji } from "markdown-it-emoji";
import anchor from "markdown-it-anchor";

export const markdown = {
  plugins: [emoji, anchor],
};
