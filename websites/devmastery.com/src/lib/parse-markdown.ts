import matter from "gray-matter";
import yaml from "js-yaml";

export function parseMarkdown({ markdown }: { markdown: string }) {
  let { data: frontMatter, content: body } = matter(markdown, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  return { frontMatter, body };
}
