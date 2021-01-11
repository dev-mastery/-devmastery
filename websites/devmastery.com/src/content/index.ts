import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import path from "path";
import localeConfig from "../../locales.config";
import { parseMarkdown } from "../lib/parse-markdown";
import readingTime from "reading-time";
import { looseMatch, looseMatchAny } from "../lib/util";
import { findByContentType } from "../lib/cms";

export {
  find,
  findByCategory,
  findById,
  findBySlug,
  findByTag,
  findByTopic,
  findByType,
  getAuthors,
  getCategories,
  getContentTypes,
  getLatest,
  getLocalesForSlug,
  getSlugs,
  getTags,
  getTopics,
};

export type { ContentItem };

let initState: "initialized" | "pending" = "pending";
let byId = new Map<ContentId, ContentItem>();
let types = new Set<ContentType>();
let tags = new Set<ContentTag>();
let categories = new Set<ContentCategory>();
let topics = new Set<ContentTopic>();
let authors = new Set<AuthorName>();
let slugLocales = new Map<Slug, Locale[]>();

// let byAuthorLocale = new Map<AuthorName, Map<Locale, ContentId[]>>();
// let byCategoryLocale = new Map<ContentCategory, Map<Locale, ContentId[]>>();
// let bySlugLocale = new Map<Slug, Map<Locale, ContentId>>();
// let byTagLocale = new Map<ContentTag, Map<Locale, ContentId[]>>();
// let byTopicLocale = new Map<ContentTopic, Map<Locale, ContentId[]>>();
// let byTypeLocale = new Map<ContentType, Map<Locale, ContentId[]>>();
// let byTypeSlug = new Map<ContentType, Map<Slug, ContentId[]>>();

export const CONTENT_ROOT = path.join(process.cwd(), "documents");
export const DEFAULT_LOCALE: Locale = (localeConfig.defaultLocale ??
  "en") as Locale;
export const SUPPORTED_LOCALES: Locale[] = localeConfig.locales as Locale[];

async function findById(id: string) {
  await init();
  return byId.get(id) ?? null;
}

async function findByType({
  type,
  locale = DEFAULT_LOCALE,
  sort,
}: {
  type: ContentType;
  locale?: Locale;
  sort?: ContentSort;
}) {
  let filter = (item: ContentItem) =>
    looseMatch(item.type, type, locale) &&
    looseMatch(item.locale, locale, locale);
  return find({ filter, sort });
}

async function findBySlug({
  slug,
  locale = DEFAULT_LOCALE,
}: {
  slug: Slug;
  locale?: Locale;
}) {
  let filter = (item: ContentItem) => {
    return (
      looseMatch(item.slug, slug, locale) &&
      looseMatch(item.locale, locale, locale)
    );
  };
  return find({ filter });
}

async function findByCategory({
  category,
  locale = DEFAULT_LOCALE,
  sort,
}: {
  category: ContentCategory;
  locale?: Locale;
  sort?: ContentSort;
}) {
  let filter = (item: ContentItem) =>
    looseMatch(item.category, category, locale) &&
    looseMatch(item.locale, locale, locale);
  return find({ filter, sort });
}

async function findByTopic({
  topic,
  locale = DEFAULT_LOCALE,
  sort,
}: {
  topic: ContentTopic;
  locale: Locale;
  sort?: ContentSort;
}) {
  let filter = (item: ContentItem) =>
    looseMatch(item.topic, topic, locale) &&
    looseMatch(item.locale, locale, locale);
  return find({ filter, sort });
}

async function findByTag({
  tag,
  locale = DEFAULT_LOCALE,
  sort,
}: {
  tag: ContentTag;
  locale: Locale;
  sort?: ContentSort;
}) {
  let filter = (item: ContentItem) =>
    looseMatchAny(item.tags, tag, locale) &&
    looseMatch(item.locale, locale, locale);
  return find({ filter, sort });
}

async function find({
  filter,
  sort,
}: {
  filter: (item: ContentItem) => boolean;
  sort?: ContentSort;
}) {
  await init();
  if (sort == null) {
    sort = (a, b) => {
      if (a.datePublished && b.datePublished) {
        return Date.parse(b.datePublished) - Date.parse(a.datePublished);
      }
      return 0;
    };
  }
  return Array.from(byId.values()).filter(filter).sort(sort);
}

async function getAuthors() {
  await init();
  return Array.from(authors);
}

async function getContentTypes() {
  await init();
  return Array.from(types);
}

async function getCategories() {
  await init();
  return Array.from(categories);
}

async function getLatest({
  type,
  locale = DEFAULT_LOCALE,
  max,
}: {
  type: ContentType;
  max?: number;
  locale?: Locale;
}) {
  let sort: ContentSort = (a, b) =>
    Date.parse(b.datePublished) - Date.parse(a.datePublished);

  let docs = await findByType({ type, locale, sort });

  return max ? docs.slice(0, max) : docs;
}

async function getLocalesForSlug({ slug }: { slug: string }) {
  await init();
  return slugLocales.get(slug);
}

async function getSlugs(options?: { type: ContentType }) {
  await init();
  let items = await findByType({ type: options?.type });
  return items.map((item) => item.slug).filter((s) => s != null);
}

async function getTopics() {
  await init();
  return Array.from(topics);
}

async function getTags() {
  await init();
  return Array.from(tags);
}

async function init() {
  if (initState === "initialized") {
    return;
  }

  let tasks = [];

  let slugs = readdirSync(CONTENT_ROOT);
  for (let slug of slugs) {
    for (let locale of SUPPORTED_LOCALES) {
      let item = await makeContentItem({
        slug,
        locale,
      });
      if (item != null) {
        tasks.push(cacheContentItem(item));
      }
    }
  }

  await Promise.all(tasks);
  initState = "initialized";

  return initState;
}

async function cacheContentItem(item: ContentItem) {
  item.author && authors.add(item.author);
  item.category && categories.add(item.category);
  item.topic && topics.add(item.topic);
  item.slug && item.locale && slugLocales.has(item.slug)
    ? slugLocales.get(item.slug).push(item.locale)
    : slugLocales.set(item.slug, [item.locale]);
  for (let tag of item.tags ?? []) {
    tags.add(tag);
  }
  return cacheById(item);
}

// async function cacheContentItem(item: ContentItem) {
//   return Promise.all([
//     cacheByAuthorLocale(item),
//     cacheByCategoryLocale(item),
//     cacheById(item),
//     cacheBySlugLocale(item),
//     cacheByTagLocale(item),
//     cacheByTopicLocale(item),
//     cacheByTypeLocale(item),
//     cacheByTypeSlug(item),
//   ]);
// }

// async function cacheByAuthorLocale({
//   author = "Unknown",
//   locale,
//   id,
// }: Pick<ContentItem, "author" | "locale" | "id">) {
//   if (!byAuthorLocale.has(author)) {
//     byAuthorLocale.set(author, new Map<Locale, ContentId[]>());
//   }

//   let byLocale = byAuthorLocale.get(author);
//   if (!byLocale.has(locale)) {
//     byLocale.set(locale, []);
//   }

//   byLocale.get(locale).push(id);

//   return byAuthorLocale;
// }

async function cacheById(item: ContentItem) {
  byId = byId ?? new Map<string, ContentItem>();
  if (item != null) {
    byId.set(item.id, item);
  }
  return byId;
}

// async function cacheByTypeLocale({
//   type,
//   locale,
//   id,
// }: Pick<ContentItem, "type" | "locale" | "id">) {
//   if (!byTypeLocale.has(type)) {
//     byTypeLocale.set(type, new Map<Locale, ContentId[]>());
//   }

//   let byLocale = byTypeLocale.get(type);
//   if (!byLocale.has(locale)) {
//     byLocale.set(locale, []);
//   }

//   if (!byLocale.get(locale).includes(id)) {
//     byLocale.get(locale).push(id);
//   }

//   return byTypeLocale;
// }

// async function cacheBySlugLocale({
//   slug,
//   locale,
//   id,
// }: Pick<ContentItem, "slug" | "locale" | "id">) {
//   if (!bySlugLocale.has(slug)) {
//     bySlugLocale.set(slug, new Map<Locale, ContentId>());
//   }

//   let byLocale = bySlugLocale.get(slug);
//   byLocale.set(locale, id);

//   return bySlugLocale;
// }

// async function cacheByTypeSlug({
//   slug,
//   type,
//   id,
// }: Pick<ContentItem, "slug" | "type" | "id">) {
//   if (!byTypeSlug.has(type)) {
//     byTypeSlug.set(type, new Map<Slug, ContentId[]>());
//   }

//   let bySlug = byTypeSlug.get(type);
//   if (!bySlug.has(slug)) {
//     bySlug.set(slug, []);
//   }
//   if (!bySlug.get(slug).includes(id)) {
//     bySlug.get(slug).push(id);
//   }

//   return bySlugLocale;
// }

// async function cacheByCategoryLocale({
//   id,
//   category,
//   locale,
// }: Pick<ContentItem, "id" | "category" | "locale">) {
//   if (category == null) return byCategoryLocale;

//   if (!byCategoryLocale.has(category)) {
//     byCategoryLocale.set(category, new Map<Locale, ContentId[]>());
//   }

//   let byLocale = byCategoryLocale.get(category);
//   if (!byLocale.has(locale)) {
//     byLocale.set(locale, []);
//   }

//   if (!byLocale.get(locale).includes(id)) {
//     byLocale.get(locale).push(id);
//   }

//   return byCategoryLocale;
// }

// async function cacheByTopicLocale({
//   topic,
//   id,
//   locale,
// }: Pick<ContentItem, "topic" | "id" | "locale">) {
//   if (topic == null) return byTopicLocale;

//   if (!byTopicLocale.has(topic)) {
//     byTopicLocale.set(topic, new Map<Locale, ContentId[]>());
//   }
//   let byLocale = byTopicLocale.get(topic);
//   if (!byLocale.has(locale)) {
//     byLocale.set(locale, []);
//   }
//   if (!byLocale.get(locale).includes(id)) {
//     byLocale.get(locale).push(id);
//   }
//   return byTopicLocale;
// }

// async function cacheByTagLocale({
//   id,
//   tags = [],
//   locale,
// }: Pick<ContentItem, "id" | "tags" | "locale">) {
//   for (let tag of tags) {
//     if (!byTagLocale.has(tag)) {
//       byTagLocale.set(tag, new Map<Locale, ContentId[]>());
//     }
//     let byLocale = byTagLocale.get(tag);
//     if (!byLocale.has(locale)) {
//       byLocale.set(locale, []);
//     }
//     if (!byLocale.get(locale).includes(id)) {
//       byLocale.get(locale).push(id);
//     }

//     return byTagLocale;
//   }
// }

async function makeContentItem({
  slug,
  locale,
}: {
  slug: Slug;
  locale: Locale;
}): Promise<ContentItem> {
  if (slug == null) return null;
  let slugPath = path.join(CONTENT_ROOT, slug);
  let filePath = makeFilePath({ slugPath, locale });

  let fileNotFound = !existsSync(filePath);
  if (fileNotFound) {
    return null;
  }

  let info = statSync(filePath);
  let contents = readFileSync(filePath, "utf-8");
  let { frontMatter, body } = parseMarkdown({ markdown: contents });
  let dateCreated = formatDate({ locale: locale, date: info.ctimeMs });

  return {
    ...frontMatter,
    body,
    type: frontMatter.type,
    dateCreated,
    dateModified: formatDate({ locale: locale, date: info.mtimeMs }),
    datePublished: frontMatter.datePublished
      ? formatDate({
          locale: locale,
          date: frontMatter.datePublished,
        })
      : dateCreated,
    id: makeId({ slug, locale }),
    length: Math.round(frontMatter.length ?? readingTime(body).minutes),
    locale,
    title: frontMatter.title ?? slug.replaceAll("-", " "),
    slug,
  };
}

function makeFilePath({
  slugPath,
  locale,
}: {
  slugPath: string;
  locale: string;
}) {
  return path.join(slugPath, `index.${locale}.md`);
}

function formatDate({
  locale,
  date,
}: {
  locale: string;
  date: string | number;
}) {
  return new Date(date).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
}

function makeId({ slug, locale }: { slug: string; locale: string }) {
  return `${slug}:${locale}`;
}

interface ContentItem {
  [key: string]: any;
  author?: AuthorName;
  body: string;
  category?: ContentCategory;
  cover?: string;
  dateCreated: string;
  dateModified: string;
  datePublished: string;
  description?: string;
  id: ContentId;
  length?: number;
  locale: Locale;
  section?: string;
  slug: Slug;
  tags?: ContentTag[];
  title: string;
  topic?: ContentTopic;
  type: ContentType;
}
type AuthorName = string;
type ContentCategory = string;
type ContentId = string;
type ContentSection = string;
type ContentTag = string;
type ContentTopic = string;
type ContentType = string;
type Slug = string;
type ContentSort = (a: ContentItem, b: ContentItem) => number;
