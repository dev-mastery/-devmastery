import type { ContentId, NonEmptyString } from "../../common/entities";
import type { PostFactory } from "../entities";

export function makeDataStore({
  fileExists,
  makePath,
  postFromMarkdown,
  postsRoot,
  readDir,
  readFile,
  supportedLocales,
}: {
  fileExists: FileExistsFn;
  makePath: MakePathFn;
  postFromMarkdown: PostFromMarkdownFn;
  postsRoot: string;
  readDir: ReadDirFn;
  readFile: ReadFileFn;
  supportedLocales: Locale[];
}) {
  const byId = new Map<string, PostFactory>();
  const slugs = new Set<string>();
  const categories = new Map<Locale, Set<string>>();
  const topics = new Map<Locale, Set<string>>();
  const tags = new Map<Locale, Set<string>>();
  const refresh = init.bind(this, { force: true });
  let initialized = false;

  init().then((result) => (initialized = result ?? false));

  return Object.freeze({
    getCategories: async () => categories,
    find,
    get,
    getSlugs: async () => slugs,
    getTags: async () => tags,
    getTopics: async () => topics,
  });

  async function get(id: ContentId) {
    let found = byId.get(id.toString());
    if (!found) {
      await refresh();
      found = byId.get(id.toString());
    }
    return found ?? null;
  }

  async function find(predicate: (p: PostFactory) => boolean) {
    let found = Array.from(byId.values()).filter(predicate);
    if (!found) {
      await refresh();
      found = Array.from(byId.values()).filter(predicate);
    }
    return found;
  }

  async function init(props?: { force?: boolean }) {
    if (initialized && !props?.force) {
      return;
    }
    const slugList = readDir({ path: postsRoot });
    for (const slug of slugList) {
      cacheSlug(slug);
      for (const locale of supportedLocales) {
        const path = getFilePath({ locale, slug });
        if (fileExists({ path })) {
          const post = makePostFromFile({ path, slug, locale });
          cachePost(post);
          cacheCategory({ locale, category: post.category });
          cacheTopic({ locale, topic: post.topic });
          cacheTags({ locale, tagList: post.tags });
        }
      }
    }
    return true;
  }

  function cacheSlug(slug: string) {
    slugs.add(slug);
  }

  function cachePost(post: PostFactory) {
    byId.set(post.id.toString(), post);
  }

  function makePostFromFile({
    path,
    slug,
    locale,
  }: {
    path: string;
    slug: string;
    locale: Locale;
  }) {
    const { contents, createdAt, modifiedAt } = readFile({ path });
    const post = postFromMarkdown({
      slug,
      locale,
      dateCreated: createdAt,
      dateModified: modifiedAt,
      markdown: contents,
    });
    return post;
  }

  function getFilePath({ locale, slug }: { locale: string; slug: string }) {
    const fileName = `index.${locale}.md`;
    const path = makePath(postsRoot, slug, fileName);
    return path;
  }

  function cacheTags({
    locale,
    tagList,
  }: {
    locale: Locale;
    tagList: string[];
  }) {
    if (!tags.has(locale)) {
      tags.set(locale, new Set<string>());
    }
    tagList.forEach((tag) => tags.get(locale).add(tag));
  }

  function cacheTopic({
    locale,
    topic,
  }: {
    locale: Locale;
    topic: NonEmptyString;
  }) {
    if (!topics.has(locale)) {
      topics.set(locale, new Set<string>());
    }
    topics.get(locale).add(topic.toString());
  }

  function cacheCategory({
    locale,
    category,
  }: {
    locale: Locale;
    category: NonEmptyString;
  }) {
    if (!categories.has(locale)) {
      categories.set(locale, new Set<string>());
    }
    categories.get(locale).add(category.toString());
  }
}

type ReadDirFn = ({ path: string }) => string[];
type MakePathFn = (...args: any[]) => string;
type ReadFileFn = ({ path: string }) => FileInfo;
type FileExistsFn = ({ path: string }) => boolean;
type PostFromMarkdownFn = (props: {
  dateCreated: number;
  dateModified: number;
  markdown: string;
  locale: Locale;
  translations?: Locale[];
  slug: string;
}) => PostFactory;

interface FileInfo {
  contents: string;
  createdAt: number;
  modifiedAt: number;
}

export type PostData = ReturnType<typeof makeDataStore>;
