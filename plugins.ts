import { es } from "date-fns/locale/es";
import icons from "@lumeland/plugin-icons";
import inline from "@lumeland/plugin-inline";
import shiki from "@/shiki.js";
import base_path from "@lumeland/plugin-base-path";
import date from "@lumeland/plugin-date";
import esbuild from "@lumeland/plugin-esbuild";
import google_fonts from "@lumeland/plugin-google-fonts";
import lightningcss from "@lumeland/plugin-lightningcss";
import metas from "@lumeland/plugin-metas";
import minify_html from "@lumeland/plugin-minify-html";
import nav from "@lumeland/plugin-nav";
import og_images from "@lumeland/plugin-og-images";
import resolve_urls from "@lumeland/plugin-resolve-urls";
import robots from "@lumeland/plugin-robots";
import seo from "@lumeland/plugin-seo";
import sitemap from "@lumeland/plugin-sitemap";
import feed from "@lumeland/plugin-feed";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Archivo:wght@400..900&display=swap";

const SHIKI_THEME_LIGHT = "github-light-high-contrast";
const SHIKI_THEME_DARK = "github-dark-high-contrast";

export default function () {
  return (site: Lume.Site) => {
    site
      .use(esbuild())
      .use(
        google_fonts({
          cssFile: "/styles/fonts.css",
          subsets: ["latin"],
          fontsFolder: "fonts",
          fonts: FONT_URL,
        }),
      )
      .use(lightningcss())
      .use(base_path())
      .use(nav())
      .use(metas())
      .use(minify_html())
      .use(
        og_images({
          options: {
            width: 1080,
            height: 567,
          },
        }),
      )
      .use(icons())
      .use(inline())
      .use(resolve_urls())
      .use(robots())
      .use(
        shiki({
          highlighter: {
            themes: [SHIKI_THEME_LIGHT, SHIKI_THEME_DARK],
          },
          themes: {
            light: SHIKI_THEME_LIGHT,
            dark: SHIKI_THEME_DARK,
          },
        }),
      )
      .use(date({ locales: { es } }))
      .use(
        seo({
          output: "_seo-issues.json",
          options: {
            body: {
              min: 1,
              unit: "character",
            },
          },
        }),
      )
      .use(sitemap())
      .use(
        feed({
          output: ["/feed/index.xml"],
          query: "type=note",
          info: {
            title: "=index.title",
            description: "=index.description",
            lang: "=lang",
          },
          items: {
            title: "=title",
            description: "=excerpt",
            content: "$.prose",
          },
        }),
      );
  };
}
