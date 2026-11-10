import * as ctfl from "contentful";
import { env } from "@/utils.js";

const client = ctfl.createClient({
  space: env("CTFL_SPACE_ID"),
  accessToken: env("CTFL_ACCESS_TOKEN"),
  host: env("CTFL_HOST"),
});

const tagItems = await client.getTags();
const tagMap = new Map(tagItems.items.map((t) => [t.sys.id, t.name]));

type Entries = Awaited<ReturnType<typeof client.getEntries>>;

const processContentfulEntries = (entryItems: Entries) => {
  return entryItems.items.map((entry) => {
    const { fields, sys, metadata } = entry;
    return {
      ...fields,
      date: sys.createdAt,
      lang: sys.locale,
      tags: metadata.tags.map((t) => tagMap.get(t.sys.id)),
    };
  });
};

export { client, processContentfulEntries };
