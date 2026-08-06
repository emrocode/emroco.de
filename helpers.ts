export default function () {
  return (site: Lume.Site) => {
    site
      .helper(
        "ms",
        (text: string) => {
          return text.replace(/\[/g, "<span>").replace(/\]/g, "</span>");
        },
        { type: "filter" },
      )
      .helper(
        "readingTime",
        (text: string) => {
          const wordsPerMinute = 275;
          const words = text.trim().split(/\s+/).length;
          return Math.ceil(words / wordsPerMinute);
        },
        { type: "filter" },
      );
  };
}
