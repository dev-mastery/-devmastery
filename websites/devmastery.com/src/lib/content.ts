import {
  listSubfolders,
  fileExists,
  getFileInfo,
  makePath,
} from "./file-system";
import matter from "gray-matter";
import yaml from "js-yaml";
import { pipe } from "./util";

export default {
  isContentType,
  getContentTypes,
  getSlugs,
  getContent,
  findContent,
  getContentItem,
};

const CWD = process.cwd();
const CONTENT_ROOT = "content";
const getContentFolders = pipe(getContentPath, listSubfolders);

// cache.
let contentItems: {
  [locale: string]: { [contentType: string]: Content[] };
} = {};
let contentSlugs: { [contentType: string]: string[] } = {};
let contentTypes: string[];

export interface Markdown {
  frontMatter: { [key: string]: any };
  body: string;
}

export interface FrontMatter {
  title: string;
  summary: string;
  image?: string;
  originallyPublished: string | number;
  imageCaption?: string;
}

export interface Content extends FrontMatter {
  id: string;
  slug: string;
  body: string;
  createdAt: number;
  modifiedAt: number;
  contentType: string;
  locale: string;
}

export interface GetSlugsProps {
  contentType: string;
}
export async function getSlugs({
  contentType,
}: GetSlugsProps): Promise<string[]> {
  await validateContentType({ contentType });
  let slugs = await getContentFolders({ contentType });
  return (contentSlugs[contentType] = contentSlugs[contentType] ?? slugs);
}

export interface IsContentTypeProps {
  contentType: string;
}
export async function isContentType({
  contentType,
}: IsContentTypeProps): Promise<boolean> {
  return (await getContentTypes()).includes(contentType);
}

export async function getContentTypes() {
  return (contentTypes = contentTypes ?? (await getContentFolders()));
}

export interface GetContentItemProps {
  locale: string;
  contentType: string;
  slug: string;
}
export async function getContentItem<T extends Content>({
  locale,
  contentType,
  slug,
}: GetContentItemProps) {
  let found = await findContent<T>({
    locale,
    contentType,
    predicate: (c) => c.slug === slug,
  });

  return found[0];
}

export interface FindContentProps<T extends Content> {
  locale: string;
  contentType: string;
  predicate: (item: T) => boolean;
}
export async function findContent<T extends Content>({
  locale,
  contentType,
  predicate,
}: FindContentProps<T>) {
  return (await getContent<T>({ locale, contentType })).filter(predicate);
}

export interface GetContentProps {
  locale: string;
  contentType: string;
  fallbackLocale?: string;
}
export async function getContent<T extends Content>({
  locale,
  contentType,
  fallbackLocale = "en",
}: GetContentProps): Promise<T[]> {
  if (
    process.env.NODE_ENV === "production" &&
    contentItems &&
    contentItems[locale] &&
    contentItems[locale][contentType]
  ) {
    return contentItems[locale][contentType] as T[];
  }

  await validateContentType({ contentType });

  let slugs = await getSlugs({ contentType });
  let items: T[] = [];

  for (let slug of slugs) {
    let filePath = await getMarkdownFilePath({
      contentType,
      slug,
      locale,
      fallbackLocale,
    });

    if (fileExists(filePath)) {
      let {
        frontMatter,
        body,
        createdAt,
        modifiedAt,
      } = await processMarkdownFile({ filePath });

      let contentItem = {
        id: `${contentType}/${slug}`,
        body,
        contentType,
        createdAt,
        locale,
        modifiedAt,
        slug,
        ...frontMatter,
      };

      items.push(contentItem as T);
    }
  }

  contentItems[locale] = contentItems[locale] ?? {};
  contentItems[locale][contentType] = items;
  return contentItems[locale][contentType] as T[];
}

interface GetMarkdownFilePathProps {
  contentType: string;
  slug: string;
  locale: string;
  fallbackLocale?: string;
}
async function getMarkdownFilePath({
  contentType,
  slug,
  locale,
  fallbackLocale,
}: GetMarkdownFilePathProps) {
  let contentPath = getContentPath({ contentType });
  let filePath = makePath(contentPath, slug, `index.${locale}.md`);
  if (!fileExists(filePath)) {
    filePath = makePath(contentPath, slug, `index.${fallbackLocale}.md`);
  }
  return filePath;
}

export interface GetContentPathProps {
  contentType?: string;
  cwd?: string;
  contentRoot?: string;
}
function getContentPath(props?: GetContentPathProps): string {
  let { cwd = CWD, contentRoot = CONTENT_ROOT, contentType = "" } = props ?? {};
  return makePath(cwd, contentRoot, contentType);
}

async function processMarkdownFile({ filePath }) {
  let { contents, createdAt, modifiedAt } = await getFileInfo(filePath);
  let { frontMatter, body } = await parseMarkdown({ markdown: contents });

  frontMatter.summary =
    frontMatter.summary ?? body.split("\n").slice(0, 2).join("");

  frontMatter.title =
    frontMatter.title ?? body.split("\n")[0].replace(/#+/, "");

  frontMatter.originallyPublished =
    frontMatter.originallyPublished != null
      ? new Date(frontMatter.originallyPublished).valueOf()
      : createdAt;

  return { frontMatter, body, createdAt, modifiedAt };
}

async function parseMarkdown({ markdown }: { markdown: string }) {
  let { data: frontMatter, content: body } = matter(markdown, {
    engines: {
      yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  return { frontMatter, body };
}

async function validateContentType({ contentType }: { contentType: string }) {
  if (!(await isContentType({ contentType }))) {
    throw new Error(`Content type "${contentType}" not found.`);
  }
}
