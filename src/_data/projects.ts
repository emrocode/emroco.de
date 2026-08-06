import { client, processContentfulEntries } from "./ctfl.ts";

const projectsItems = await client.getEntries({
  content_type: "projects",
  order: ["-sys.createdAt"],
  "fields.is_pinned": true,
});
const projects = processContentfulEntries(projectsItems);

export default projects;
