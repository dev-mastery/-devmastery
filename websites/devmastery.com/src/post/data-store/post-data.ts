import type { ContentId } from "../../common/entities";
import type { Post } from "../entities/post";

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
  let byId = new Map<string, Post>();
  let slugs = new Set<string>();
  let categories = new Map<Locale, Set<string>>();
  let topics = new Map<Locale, Set<string>>();
  let tags = new Map<Locale, Set<string>>();
  let refresh = init.bind(this, { force: true });
  let initialized = false;

  init();

  async function get(id: ContentId) {
    let found = byId.get(id.toString());
    if (!found) {
      await refresh();
      found = byId.get(id.toString());
    }
    return found ?? null;
  }

  async function find(predicate: (p: Post) => boolean) {
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

    for (let slug of readDir({ path: postsRoot })) {
      slugs.add(slug);

      for (let locale of supportedLocales) {
        let fileName = `index.${locale}.md`;
        let path = makePath(postsRoot, slug, fileName);
        if (fileExists({ path })) {
          let { contents, createdAt, modifiedAt } = readFile({ path });
          let post = postFromMarkdown({
            slug,
            locale,
            dateCreated: createdAt,
            dateModified: modifiedAt,
            markdown: contents,
          });
          byId.set(post.id.toString(), post);

          if (!categories.has(locale)) {
            categories.set(locale, new Set<string>());
          }
          categories.get(locale).add(post.language.locale);

          if (!topics.has(locale)) {
            topics.set(locale, new Set<string>());
          }
          topics.get(locale).add(post.topic.toString());

          if (!tags.has(locale)) {
            tags.set(locale, new Set<string>());
          }
          post.tags.forEach((tag) => tags.get(locale).add(tag));
        }
      }
    }
    initialized = true;
  }

  return Object.freeze({
    getCategories: async () => categories,
    find,
    get,
    getSlugs: async () => slugs,
    getTags: async () => tags,
    getTopics: async () => topics,
  });
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
}) => Post;

interface FileInfo {
  contents: string;
  createdAt: number;
  modifiedAt: number;
}

export type PostData = ReturnType<typeof makeDataStore>;
