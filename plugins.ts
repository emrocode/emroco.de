import { es } from "date-fns";
import simpleicons from "lume/icons/simpleicons.ts";
import phosphor from "lume/icons/phosphor.ts";
import shiki from "shiki/mod.ts";
import shiki_lang from "shiki/plugins/lang/mod.ts";
import base_path from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import google_fonts from "lume/plugins/google_fonts.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import metas from "lume/plugins/metas.ts";
import minify_html from "lume/plugins/minify_html.ts";
import nav from "lume/plugins/nav.ts";
import og_images from "lume/plugins/og_images.ts";
import resolve_urls from "lume/plugins/resolve_urls.ts";
import robots from "lume/plugins/robots.ts";
import seo from "lume/plugins/seo.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";

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
      .use(simpleicons())
      .use(phosphor())
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
      .use(shiki_lang())
      .use(
        date({
          locales: { es },
        }),
      )
      .use(
        seo({
          output: "_seo-issues.json",
          options: {
            body: {
              min: 1,
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
