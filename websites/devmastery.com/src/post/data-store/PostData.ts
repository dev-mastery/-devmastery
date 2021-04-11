import { ContentId, Slug } from "../../common/entities";
import type { Category, Post, Topic } from "../entities";

// Note: Resist the temptation to add caching here.
// NextJS builds each page in a separate process
// so caching needs to happen out-of-proc (local filesystem or database).
// Since the source data is already on the local filesystem, caching
// would do no good.

/**
 * Encapsulates the posts.
 *
 * @export
 * @class PostData
 */
export class PostData {
  readonly #fileExists: FileExistsFn;
  readonly #makePath: MakePathFn;
  readonly #postFromMarkdown: PostFromMarkdownFn;
  readonly #postsRoot: string;
  readonly #readDir: ReadDirFn;
  readonly #readFile: ReadFileFn;
  readonly #supportedLocales: Locale[];

  public constructor({
    fileExists,
    makePath,
    postFromMarkdown,
    postsRoot,
    readDir,
    readFile,
    supportedLocales,
  }: PostDataDependencies) {
    this.#fileExists = fileExists;
    this.#makePath = makePath;
    this.#postFromMarkdown = postFromMarkdown;
    this.#postsRoot = postsRoot;
    this.#readDir = readDir;
    this.#readFile = readFile;
    this.#supportedLocales = supportedLocales;
  }

  public async get(id: ContentId): Promise<Post | null> {
    const predicate = (p: Post) => p.id.equals(id);
    return (await this.find(predicate))[0];
  }

  public async findByLocale(locale: Locale): Promise<Post[]> {
    const predicate = (p: Post) => p.locale === locale;
    return this.find(predicate);
  }

  public async findByCategory(
    category: Category,
    locale?: Locale
  ): Promise<Post[]> {
    const predicate = (p: Post) =>
      p.category.equals(category) && p.locale === (locale ?? p.locale);

    return this.find(predicate);
  }

  public async findByTopic(topic: Topic, locale?: Locale): Promise<Post[]> {
    const predicate = (p: Post) =>
      p.topic.equals(topic) && p.locale === (locale ?? p.locale);

    return this.find(predicate);
  }

  public async find(predicate: (p: Post) => boolean): Promise<Post[]> {
    return (await this.listAll()).filter(predicate);
  }

  public async getSlugs(): Promise<Slug[]> {
    return this.#readDir({ path: this.#postsRoot }).map(Slug.of);
  }

  public async listAll(): Promise<Readonly<Post[]>> {
    const slugs = await this.getSlugs();
    return slugs.reduce((posts: Post[], s: Slug) => {
      const slug = s.toString();
      this.#supportedLocales.forEach((locale) => {
        const path = this.getFilePath({ locale, slug });
        if (this.#fileExists({ path })) {
          const post = this.makePostFromFile({
            path,
            slug,
            locale,
          });
          posts.push(post);
        }
      });
      return posts;
    }, []);
  }

  private makePostFromFile({
    path,
    slug,
    locale,
  }: {
    path: string;
    slug: string;
    locale: Locale;
  }) {
    const { contents, createdAt, modifiedAt } = this.#readFile({ path });
    return this.#postFromMarkdown({
      slug,
      locale,
      dateCreated: createdAt,
      dateModified: modifiedAt,
      rawMarkdown: contents,
    });
  }

  private getFilePath({ locale, slug }: { locale: string; slug: string }) {
    const fileName = `index.${locale}.md`;
    return this.#makePath(this.#postsRoot, slug, fileName);
  }
}

interface PostDataDependencies {
  fileExists: FileExistsFn;
  makePath: MakePathFn;
  postFromMarkdown: PostFromMarkdownFn;
  postsRoot: string;
  readDir: ReadDirFn;
  readFile: ReadFileFn;
  supportedLocales: Locale[];
}
type ReadDirFn = (props: { path: string }) => string[];
type MakePathFn = (...args: string[]) => string;
type ReadFileFn = (props: { path: string }) => FileInfo;
type FileExistsFn = (props: { path: string }) => boolean;
type PostFromMarkdownFn = (props: {
  dateCreated: number;
  dateModified: number;
  rawMarkdown: string;
  locale: Locale;
  translations?: Locale[];
  slug: string;
}) => Post;

interface FileInfo {
  contents: string;
  createdAt: number;
  modifiedAt: number;
}
