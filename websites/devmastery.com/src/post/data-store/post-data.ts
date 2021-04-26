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
// wouldn't help very much.

const ROOT = path.join(process.cwd(), "data", "posts");

export async function getSlugs(): Promise<Slug[]> {
  const toSlug = Slug.from;
  const folders = listPostFolders(ROOT);
  return folders.map(toSlug);
}

export async function listAll(): Promise<Post[]> {
  return localeConfig.locales.flatMap((l) => listAllInLocale(l as Locale));
}

export async function get(id: ContentId): Promise<Post | null> {
  const byId = (post: Post) => post.id.equals(id);
  const results = await find(byId);
  if (results.length > 1) {
    warnAboutBadDataForPost(id);
  }
  return results[0];
}

export async function findByLocale(locale: Locale): Promise<Post[]> {
  const byLocale = (post: Post) => post.locale === locale;
  return find(byLocale);
}

export async function findByCategory(
  category: Category,
  locale?: Locale
): Promise<Post[]> {
  const byCategory = (post: Post) =>
    post.category.equals(category) && post.locale === (locale ?? post.locale);

  return find(byCategory);
}

export async function findByTopic(
  topic: Topic,
  locale?: Locale
): Promise<Post[]> {
  const byTopic = (post: Post) =>
    post.topic.equals(topic) && post.locale === (locale ?? post.locale);

  return find(byTopic);
}

export async function find(predicate: (p: Post) => boolean): Promise<Post[]> {
  const posts = await listAll();
  const findPosts = findPostsInList(posts);
  return findPosts(predicate);
}

function listPostFolders(parent: string): string[] {
  return fs.readdirSync(parent);
}

function listAllInLocale(locale: Locale): Post[] {
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
}

function getPostFilePathFromRoot(
  root: string
): (postDir: string) => (locale: string) => string {
  return function fromDir(postDir: string): (locale: string) => string {
    return function fromLocale(locale: string): string {
      return path.join(root, postDir, `index.${locale}.md`);
    };
  };
}

const getPostFilePathFromPostDir = getPostFilePathFromRoot(ROOT);

function getPostMeta(
  postPath: string
): { dateCreated: number; dateModified: number } | null {
  return fs.existsSync(postPath)
    ? [fs.statSync(postPath)].map((s) => ({
        dateCreated: s.ctimeMs,
        dateModified: s.mtimeMs,
      }))[0]
    : null;
}

function getPostContent(postPath: string): string | null {
  return fs.existsSync(postPath)
    ? fs.readFileSync(postPath, { encoding: "utf8" })
    : null;
}

function findPostsInList(
  posts: Post[]
): (predicate: (p: Post) => boolean) => Post[] {
  return function filterBy(predicate: (p: Post) => boolean): Post[] {
    return posts.filter(predicate);
  };
}

function warnAboutBadDataForPost(id: ContentId): never {
  throw new OperationalError({
    context: `Retrieving Post with id: "${id}"`,
    mergeFields: { id },
    message: `WARNING: multiple posts with id: "${id}"`,
    severity: "Medium",
  });
}
