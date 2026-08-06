export const layout = "layouts/prose.vto";
export const openGraphLayout = "layouts/og.jsx";

export default function* ({ notes }: any) {
  for (const note of notes) {
    yield {
      metas: {
        title: note.title,
        description: note.excerpt,
        image: `/notes/${note.slug}/index.png`,
      },
      type: "note",
      url: `/notes/${note.slug}/`,
      title: note.title,
      content: note.content,
      description: note.excerpt,
      ...note,
    };
  }
}
