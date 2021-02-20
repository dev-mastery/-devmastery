import unified from "unified";
import remark from "remark-parse";
import retext from "remark-retext";
import english from "parse-english";
import text from "retext-stringify";

export function mdToText(markdown: string): string {
  return unified()
    .use(remark)
    .use(retext, english)
    .use(text)
    .processSync(markdown)
    .contents.toString();
}
