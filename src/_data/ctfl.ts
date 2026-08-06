import * as ctfl from "contentful";
import { env } from "@/utils.ts";

const client = ctfl.createClient({
  space: env("CTFL_SPACE_ID"),
  accessToken: env("CTFL_ACCESS_TOKEN"),
  host: env("CTFL_HOST"),
});

const tagItems = await client.getTags();
const tagMap = new Map(tagItems.items.map((t) => [t.sys.id, t.name]));

const processContentfulEntries = (entryItems) => {
  return entryItems.items.map((entry) => {
    const { fields, sys, metadata } = entry;
    return {
      ...fields,
      doc_ca: sys.createdAt,
      doc_ua: sys.updatedAt,
      tags: metadata.tags.map((t) => tagMap.get(t.sys.id)),
    };
  });
};

export { client, processContentfulEntries };
