import {
  makePath,
  listSubfolders,
  getFileInfo,
  fileExists,
} from "./file-system";
import { parseMarkdown } from "./parse-markdown";
import localeConfig from "../../locales.config";

export default {
  findByContentType,
  findBySlug,
  getContentTypes,
  getSlugs,
};

const CONTENT_ROOT = makePath(process.cwd(), "content");
const DEFAULT_LOCALE = localeConfig.defaultLocale ?? "en";

let byId = new Map<string, Content>();
let bySlug = new Map<string, Map<string, string>>();
let byContentType = new Map<string, Map<string, string[]>>();
let contentHasLoaded = false;

export async function findBySlug(
  slug: string,
  options?: {
    locale?: string;
    fallbackLocale?: string;
  }
) {
  let locale = options?.locale || DEFAULT_LOCALE;
  let fallbackLocale = options?.fallbackLocale;

  await loadContent();

  let idsByLocale = bySlug.get(slug);
  let id = idsByLocale.get(locale);
  if (fallbackLocale && id == null) {
    id = idsByLocale.get(fallbackLocale);
  }

  let contentItem = id ? byId.get(id) ?? null : null;
  return contentItem;
}

export async function findByContentType(
  contentType: string,
  options?: {
    locale?: string;
    fallbackLocale?: string;
  }
) {
  let locale = options?.locale || DEFAULT_LOCALE;
  let fallbackLocale = options?.fallbackLocale;

  let idsByContentTypeLocale = byContentType.get(contentType);
  let idList = idsByContentTypeLocale.get(locale) ?? [];
  if (fallbackLocale) {
    idList.concat(idsByContentTypeLocale.get(fallbackLocale) ?? []);
  }
  return idList.map((id) => byId.get(id));
}

export async function getContentTypes() {
  await loadContent();
  return Array.from(byContentType.keys());
}

export async function getSlugs() {
  await loadContent();
  return Array.from(bySlug.keys());
}

async function loadContent() {
  if (contentHasLoaded) return;
  for (let contentType of await listSubfolders(CONTENT_ROOT)) {
    let contentTypePath = makePath(CONTENT_ROOT, contentType);
    for (let slug of await listSubfolders(contentTypePath)) {
      for (let locale of localeConfig.locales) {
        let contentPath = makePath(contentTypePath, slug, `index.${locale}.md`);
        if (fileExists(contentPath)) {
          let contentBase = await processMarkdownFile({
            filePath: contentPath,
          });
          let id = `${locale}:${contentType}:${slug}`;
          let contentItem = {
            ...contentBase,
            locale,
            contentType,
            slug,
            id,
          } as Content;

          byId.set(id, contentItem);
          storeBySlug({ slug, locale, id });
          storeByContentType({ contentType, locale, id });
        }
      }
    }
  }
  contentHasLoaded = true;
}

function storeByContentType({
  contentType,
  locale,
  id,
}: {
  contentType: string;
  locale: string;
  id: string;
}) {
  if (!byContentType.has(contentType)) {
    byContentType.set(contentType, new Map<string, string[]>());
  }

  let idsByLocale = byContentType.get(contentType);
  if (!idsByLocale.has(locale)) {
    idsByLocale.set(locale, []);
  }

  let localSlugs = idsByLocale.get(locale);
  if (!localSlugs.includes(id)) {
    localSlugs.push(id);
  }
}

function storeBySlug({
  slug,
  locale,
  id,
}: {
  slug: string;
  locale: string;
  id: string;
}) {
  if (!bySlug.has(slug)) {
    bySlug.set(slug, new Map<string, string>());
  }
  let slugidsByLocale = bySlug.get(slug);
  if (!slugidsByLocale.has(locale)) {
    slugidsByLocale.set(locale, id);
  }
}

async function processMarkdownFile({ filePath }) {
  let { contents, createdAt, modifiedAt } = await getFileInfo(filePath);
  let { frontMatter, body } = await parseMarkdown({ markdown: contents });

  frontMatter.summary =
    frontMatter.summary ?? body.split("\n").slice(0, 2).join("").trim();

  frontMatter.title =
    frontMatter.title ?? body.split("\n")[0].replace(/#+/, "");

  frontMatter.originallyPublished =
    frontMatter.originallyPublished != null
      ? new Date(frontMatter.originallyPublished).valueOf()
      : createdAt;

  return { ...frontMatter, body, createdAt, modifiedAt };
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
