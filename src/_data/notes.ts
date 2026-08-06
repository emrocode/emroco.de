import { client, processContentfulEntries } from "./ctfl.ts";

const notesItems = await client.getEntries({ content_type: "notes" });
const notes = processContentfulEntries(notesItems);

export default notes;
