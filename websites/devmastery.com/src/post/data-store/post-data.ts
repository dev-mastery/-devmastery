import * as fs from "fs";
import * as path from "path";
import { OperationalError } from "@devmastery/error";
import { Slug } from "../../common/entities";
import type { ContentId } from "../../common/entities";
import type { Category, Post, Topic } from "../entities";
import { fromMarkdown } from "../mappers";
import localeConfig from "../../../locales.config";

// Note: Resist the temptation to add caching here.
// NextJS builds each page in a separate process
// so caching needs to happen out-of-proc (local filesystem or database).
// Since the source data is already on the local filesystem, caching
// would do no good.

const ROOT = path.join(process.cwd(), "data", "posts");

export const getSlugs = async (): Promise<Slug[]> => {
  const toSlug = Slug.from;
  const folders = listPostFolders(ROOT);
  return folders.map(toSlug);
};

export const listAll = async (): Promise<Post[]> =>
  localeConfig.locales.flatMap((l) => listAllInLocale(l as Locale));

export const get = async (id: ContentId): Promise<Post | null> => {
  const byId = (p: Post) => p.id.equals(id);
  const results = await find(byId);
  if (results.length > 1) warnAboutBadDataForPost(id);
  return results[0];
};

export const findByLocale = async (locale: Locale): Promise<Post[]> => {
  const byLocale = (p: Post) => p.locale === locale;
  return find(byLocale);
};

export const findByCategory = async (
  category: Category,
  locale?: Locale
): Promise<Post[]> => {
  const byCategory = (p: Post) =>
    p.category.equals(category) && p.locale === (locale ?? p.locale);

  return find(byCategory);
};

export const findByTopic = async (
  topic: Topic,
  locale?: Locale
): Promise<Post[]> => {
  const byTopic = (p: Post) =>
    p.topic.equals(topic) && p.locale === (locale ?? p.locale);

  return find(byTopic);
};

export const find = async (
  predicate: (p: Post) => boolean
): Promise<Post[]> => {
  const posts = await listAll();
  const findPosts = findPostsInList(posts);
  return findPosts(predicate);
};

const listPostFolders = (parent: string) => fs.readdirSync(parent);

const listAllInLocale = (locale: Locale) => {
  const folders = listPostFolders(ROOT);
  return folders.reduce((posts, postDir) => {
    const getFilePath = getPostFilePathFromPostDir(postDir);
    const postFilePath = getFilePath(locale);
    const meta = getPostMeta(postFilePath);
    const rawMarkdown = meta ? getPostContent(postFilePath) : null;
    if (meta && rawMarkdown) {
      const post = fromMarkdown({
        ...meta,
        path: postDir,
        rawMarkdown,
        locale,
      });
      posts.push(post);
    }
    return posts;
  }, [] as Post[]);
};

const getPostFilePathFromRoot = (root: string) => (postDir: string) => (
  locale: string
) => path.join(root, postDir, `index.${locale}.md`);

const getPostFilePathFromPostDir = getPostFilePathFromRoot(ROOT);

const getPostMeta = (postPath: string) =>
  fs.existsSync(postPath)
    ? [fs.statSync(postPath)].map((s) => ({
        dateCreated: s.ctimeMs,
        dateModified: s.mtimeMs,
      }))[0]
    : null;

const getPostContent = (postPath: string) =>
  fs.existsSync(postPath)
    ? fs.readFileSync(postPath, { encoding: "utf8" })
    : null;

const findPostsInList = (posts: Post[]) => (predicate: (p: Post) => boolean) =>
  posts.filter(predicate);

const warnAboutBadDataForPost = (id: ContentId): never => {
  throw new OperationalError({
    context: `Retrieving Post with id: "${id}"`,
    mergeFields: { id },
    message: `WARNING: multiple posts with id: "${id}"`,
    severity: "Medium",
  });
};
