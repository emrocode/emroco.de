import "@std/dotenv/load";
import lume from "lume/mod.ts";
import helpers from "@/helpers.ts";
import plugins from "@/plugins.ts";
import { env } from "@/utils.ts";
import { markdown } from "@/md.ts";

const site = lume(
  {
    src: "./src",
    dest: "./dist",
    location: new URL(env("BASE_URL")),
  },
  { markdown },
);

site
  .use(plugins())
  .use(helpers())
  .add("scripts")
  .add("styles")
  .copy("assets", ".")
  .copy("npm:aos@2.3.4/dist/aos.css", "/styles/aos.css")
  .remoteFile(env("REMOTE_FILE_ID"), env("REMOTE_FILE_URL"))
  .process([".html"], (pages) => {
    for (const page of pages) {
      const externalLinks = page?.document?.querySelectorAll(
        'a[href^="http"], a[href^="mailto:"]',
      );
      externalLinks?.forEach((anchor: Element) => {
        const link = anchor as HTMLAnchorElement;
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
    }
  });

export default site;
