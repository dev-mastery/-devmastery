import codeblocks from "rehype-highlight";
import emoji from "remark-emoji";
import english from "parse-english";
import gfm from "remark-gfm";
import gh from "hast-util-sanitize/lib/github";
import html from "rehype-stringify";
import matter from "gray-matter";
import merge from "deepmerge";
import raw from "rehype-raw";
import rehype from "remark-rehype";
import remark from "remark-parse";
import retext from "remark-retext";
import sanitizer from "rehype-sanitize";
import text from "retext-stringify";
import unified from "unified";
import urls from "rehype-urls";
import yaml from "js-yaml";
import { handleMedia } from "../helpers/handle-media";
import { FullText } from "../../common/entities";

type Frontmatter = Record<string, unknown> | unknown;

const schema = merge(gh, { attributes: { "*": ["className"] } });

export class Markdown<TFrontmatter extends Frontmatter> {
  #html?: string;
  #text?: string;
  readonly #body: string;
  readonly #frontmatter: TFrontmatter;
  readonly #raw: string;

  private constructor({ rawMd }: { rawMd: string }) {
    const { body, frontmatter } = this.parse(rawMd);
    this.#body = body;
    this.#frontmatter = frontmatter;
    this.#raw = rawMd;
  }

  public static from<TFrontmatter extends Frontmatter>(
    rawMarkdownText: FullText
  ): Markdown<TFrontmatter> {
    return new Markdown<TFrontmatter>({
      rawMd: rawMarkdownText.toString(),
    });
  }

  public toHTML(): string {
    if (this.#html) {
      return this.#html;
    }

    return (this.#html = unified()
      .use(remark)
      .use(emoji)
      .use(gfm)
      .use(rehype, { allowDangerousHtml: true })
      .use(raw)
      .use(codeblocks)
      .use(sanitizer, schema)
      .use(urls, handleMedia)
      .use(html)
      .processSync(this.body)
      .contents.toString());
  }

  public toPlainText(): string {
    if (this.#text) {
      return this.#text;
    }

    return (this.#text = unified()
      .use(remark)
      .use(retext, english)
      .use(text)
      .processSync(this.body)
      .contents.toString()
      .trim());
  }

  public toString(): string {
    return this.#raw;
  }

  public toJSON(): MarkdownInfo {
    return {
      body: this.body,
      frontmatter: this.frontmatter,
      html: this.toHTML(),
      plainText: this.toPlainText(),
      raw: this.toString(),
    };
  }

  public get body(): string {
    return this.#body;
  }

  public get frontmatter(): TFrontmatter {
    return this.#frontmatter;
  }

  private parse(
    rawMarkdown: string
  ): { body: string; frontmatter: TFrontmatter } {
    const { content: body, data: frontmatter } = matter(rawMarkdown, {
      engines: {
        yaml: (s) =>
          yaml.load(s, { schema: yaml.JSON_SCHEMA }) as Record<
            string,
            undefined
          >,
      },
    });
    return { body: body, frontmatter: frontmatter as TFrontmatter };
  }
}

export interface MarkdownInfo {
  body: string;
  frontmatter: Frontmatter;
  html: string;
  plainText: string;
  raw: string;
}
