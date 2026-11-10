import "dotenv/config";
import lume from "@lumeland/lume";
import helpers from "@/helpers.js";
import plugins from "@/plugins.js";
import { env } from "@/utils.js";
import { markdown } from "@/md.js";

const site = lume(
  {
    src: "./src",
    dest: "./dist",
    location: new URL(env("BASE_URL")),
    watcher: {
      ignore: ["/dist", "/_seo-issues.json"],
    },
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
  .remote(env("REMOTE_FILE_ID"), env("REMOTE_FILE_URL"))
  .process([".html"], (pages: any) => {
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
