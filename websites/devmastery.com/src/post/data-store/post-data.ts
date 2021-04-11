import * as fs from "fs";
import * as path from "path";
import { Slug } from "../../common/entities";
import type { ContentId } from "../../common/entities";
import { pipe } from "../../common/helpers/fp";
import type { Category, Post, Topic } from "../entities";
import { fromMarkdown } from "../mappers";
import localeConfig from "../../../locales.config";

export const getSlugs = async (): Promise<Slug[]> =>
  pipe(slugPaths, toSlugsFromDirs);

export const get = async (id: ContentId): Promise<Post | null> => {
  const byId = (p: Post) => p.id.equals(id);
  const results = await find(byId);
  if (results.length > 1) {
    // TODO: Handle
  }
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
  return pipe(predicate, findPostsInList(posts));
};

export const listAll = async (): Promise<Post[]> =>
  pipe(slugPaths, getAllPosts(localeConfig.locales));

const findPostsInList = (posts: Post[]) => (predicate: (p: Post) => boolean) =>
  posts.filter(predicate);

const buildPath = (root: string) => (postPath: string) =>
  path.join(root, postPath);

const buildAbsolutePath = (absoluteBase: string) => (relativePath: string) =>
  path.join(absoluteBase, relativePath);
const prependAbsolutePath = buildAbsolutePath(process.cwd());
const postsRoot = prependAbsolutePath(path.join("data", "posts"));

const getAbsoluteSlugPath = buildPath(postsRoot);

const readDir = (p: string) => fs.readdirSync(p);
const slugPaths = readDir(postsRoot);

const toSlug = Slug.from;
const toSlugsFromDirs = (dirs: string[]) => {
  return dirs
    .filter((d) => fs.lstatSync(getAbsoluteSlugPath(d)).isDirectory())
    .map(toSlug);
};

const getPostFilePath = (locale: string) => (d: string) =>
  path.join(getAbsoluteSlugPath(d), `index.${locale}.md`);

const getFileInfo = (p: string) => {
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    const rawMarkdown = fs.readFileSync(p, { encoding: "utf8" });

    return {
      dateCreated: stat.ctimeMs,
      dateModified: stat.mtimeMs,
      rawMarkdown,
      path: p,
    };
  }
};

const getAllPosts = (locales: string[]) => (dirs: string[]) =>
  dirs
    .flatMap((d) =>
      locales.map((l) =>
        pipe(
          {
            locale: l as Locale,
            slug: d,
            ...pipe(d, getPostFilePath(l), getFileInfo),
          },
          toMarkdown
        )
      )
    )
    .filter((p) => p != null) as Post[];

const toMarkdown = (props: Partial<FromMarkdownProps>) => {
  if (areMarkdownProps(props)) {
    return fromMarkdown(props);
  }
};

const areMarkdownProps = (
  props: Partial<FromMarkdownProps>
): props is FromMarkdownProps => {
  return Boolean(
    props.rawMarkdown &&
      props.dateCreated &&
      props.dateModified &&
      props.slug &&
      props.locale
  );
};

interface FromMarkdownProps {
  dateCreated: number;
  dateModified: number;
  rawMarkdown: string;
  locale: Locale;
  translations?: Locale[];
  slug: string;
}
