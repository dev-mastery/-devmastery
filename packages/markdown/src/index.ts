import { OperationalError } from "@devmastery/error";
import { extractFrontmatter } from "./lib/extract-frontmatter";
import { mdToHtml } from "./lib/md-to-html";
import { mdToText } from "./lib/md-to-text";

export interface Markdown<TFrontmatter = any> {
  body: string;
  frontmatter: TFrontmatter;
  toHtml(): string;
  toText(): string;
  toString(): string;
}

export function markdownFrom<TFrontmatter = any>(
  rawMarkdown: string
): Markdown<TFrontmatter> {
  if (!rawMarkdown?.length) {
    throw new MardownNullOrEmptyError();
  }
  let { body, frontmatter } = extractFrontmatter<TFrontmatter>(rawMarkdown);
  let html: string;
  let text: string;
  return Object.freeze({
    body,
    frontmatter,
    toHtml: () => html ?? (html = mdToHtml(body)),
    toText: () => text ?? (text = mdToText(body)),
    toString: () => rawMarkdown,
  });
}

class MardownNullOrEmptyError extends OperationalError {
  constructor() {
    super({ message: "Mardown cannot be null or empty." });
  }
}
