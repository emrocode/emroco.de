import type Site from "@lumeland/core/site.ts";
import { log } from "@lumeland/core/utils/log.ts";
import { merge } from "@lumeland/core/utils/object.ts";
import {
  type BundledLanguage,
  type BundledTheme,
  createHighlighter,
  type Highlighter,
  type ShikiTransformer,
} from "shiki";

export interface Options {
  extensions?: string[];
  highlighter?: Partial<{
    themes: BundledTheme[];
    langs: BundledLanguage[];
  }>;
  themes: Record<string, BundledTheme>;
  transformers?: ShikiTransformer[];
}

export const defaults = {
  extensions: [".html"],
  highlighter: {
    themes: [
      "github-light-high-contrast",
      "github-dark-high-contrast",
    ] as BundledTheme[],
    langs: [] as BundledLanguage[],
  },
  themes: {
    light: "github-light-high-contrast",
    dark: "github-dark-high-contrast",
  } as Record<string, BundledTheme>,
  transformers: [] as ShikiTransformer[],
};

let highlighterPromise: Promise<Highlighter> | null = null;

function loadHighlighter(options: Options): Promise<Highlighter> {
  const highlighterOptions = options.highlighter as Required<
    NonNullable<Options["highlighter"]>
  >;
  highlighterPromise ??= createHighlighter(highlighterOptions);
  return highlighterPromise;
}

export default function shiki(userOptions: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.process(options.extensions, async (pages) => {
      const pagesWithCode = pages.filter((page) =>
        page.document?.querySelector("pre code[class*=language-]"),
      );
      if (!pagesWithCode.length) return;

      const highlighter = await loadHighlighter(options);

      for (const page of pagesWithCode) {
        const document = page.document!;
        const sources = document.querySelectorAll("pre code[class*=language-]");

        for (const sourceCode of sources) {
          const sourcePre = sourceCode.parentElement;
          const className = sourceCode.getAttribute("class");
          const code = sourceCode.textContent;
          if (!className || !sourcePre || !code) continue;

          const match = className.match(/language-([^\s]+)/);
          if (!match) continue;

          const [, language] = match;
          const resolved = highlighter.resolveLangAlias(language);
          let lang = resolved;

          if (!["text", "plain", "ansi"].includes(lang)) {
            if (!highlighter.getLoadedLanguages().includes(lang)) {
              try {
                await highlighter.loadLanguage(lang as BundledLanguage);
              } catch {
                lang = "text";
              }
            }
          }

          let html: string;
          try {
            html = highlighter.codeToHtml(code, {
              lang,
              themes: options.themes,
              defaultColor: false,
              transformers: options.transformers,
            });
          } catch (error) {
            log.warn(`[shiki plugin] ${(error as Error).message}`);
            continue;
          }

          const div = document.createElement("div");
          div.innerHTML = html;

          const resultPre = div.querySelector("pre");
          const resultCode = div.querySelector("pre code");
          if (!resultPre || !resultCode) continue;

          sourceCode.innerHTML = resultCode.innerHTML;

          for (const name of resultPre.getAttributeNames()) {
            sourcePre.setAttribute(name, resultPre.getAttribute(name) ?? "");
          }

          const wrapper = document.createElement("div");
          wrapper.setAttribute("class", "code-block");

          const header = document.createElement("header");
          const label = document.createElement("div");
          label.setAttribute("class", "attribute-lang");
          label.textContent = lang;
          header.append(label);

          sourcePre.replaceWith(wrapper);
          wrapper.append(header, sourcePre, document.createElement("footer"));
        }
      }
    });
  };
}
