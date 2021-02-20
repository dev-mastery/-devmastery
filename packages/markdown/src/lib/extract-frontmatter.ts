import matter from "gray-matter";
import yaml from "js-yaml";

interface Frontmatter {
  [key: string]: any;
}

export function extractFrontmatter<TFrontmatter extends Frontmatter>(
  markdown: string
) {
  let { data: frontmatter, content: body } = matter(markdown, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });

  return { frontmatter: frontmatter as TFrontmatter, body };
}
