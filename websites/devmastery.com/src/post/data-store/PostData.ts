import {
  ContentId,
  NonEmptyString,
  SlugFactory,
  slugOf,
} from "../../common/entities";
import { PostFactory } from "../entities";

export class PostData {
  #byId = new Map<string, PostFactory>();
  #slugs = new Set<SlugFactory>();
  #categories = new Map<Locale, Set<string>>();
  #topics = new Map<Locale, Set<string>>();
  #tags = new Map<Locale, Set<string>>();
  // #refresh = init.bind(this, { force: true });
  #initialized = false;
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
    this.init().then(() => (this.#initialized = true));
  }

  public refresh(): Promise<void> {
    return this.init({ force: true });
  }

  public async get(id: ContentId): Promise<PostFactory | null> {
    let found = this.#byId.get(id.toString());
    if (!found) {
      await this.refresh();
      found = this.#byId.get(id.toString());
    }
    return found ?? null;
  }

  public async find(
    predicate: (p: PostFactory) => boolean
  ): Promise<PostFactory[]> {
    let found = Array.from(this.#byId.values()).filter(predicate);
    if (!found) {
      await this.refresh();
      found = Array.from(this.#byId.values()).filter(predicate);
    }
    return found;
  }

  public async getSlugs(): Promise<Readonly<SlugFactory[]>> {
    return Object.freeze(Array.from(this.#slugs));
  }

  private async init(props?: { force?: boolean }): Promise<void> {
    if (this.#initialized && !props?.force) {
      return;
    }
    const slugList = this.#readDir({ path: this.#postsRoot });
    for (const slug of slugList) {
      this.cacheSlug(slug);
      for (const locale of this.#supportedLocales) {
        const path = this.getFilePath({ locale, slug });
        if (this.#fileExists({ path })) {
          const post = this.makePostFromFile({ path, slug, locale });
          this.cachePost(post);
          this.cacheCategory({ locale, category: post.category });
          this.cacheTopic({ locale, topic: post.topic });
          this.cacheTags({ locale, tagList: post.tags });
        }
      }
    }
    return;
  }

  private cacheSlug(slug: string) {
    this.#slugs.add(slugOf(slug));
  }

  private cachePost(post: PostFactory) {
    this.#byId.set(post.id.toString(), post);
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
      markdown: contents,
    });
  }

  private getFilePath({ locale, slug }: { locale: string; slug: string }) {
    const fileName = `index.${locale}.md`;
    return this.#makePath(this.#postsRoot, slug, fileName);
  }

  private cacheTags({
    locale,
    tagList,
  }: {
    locale: Locale;
    tagList?: string[];
  }) {
    if (!this.#tags.has(locale)) {
      this.#tags.set(locale, new Set<string>());
    }
    tagList?.forEach((tag) => this.#tags.get(locale)?.add(tag));
  }

  private cacheTopic({
    locale,
    topic,
  }: {
    locale: Locale;
    topic: NonEmptyString;
  }) {
    if (!this.#topics.has(locale)) {
      this.#topics.set(locale, new Set<string>());
    }
    this.#topics.get(locale)?.add(topic.toString());
  }

  private cacheCategory({
    locale,
    category,
  }: {
    locale: Locale;
    category: NonEmptyString;
  }) {
    if (!this.#categories.has(locale)) {
      this.#categories.set(locale, new Set<string>());
    }
    this.#categories.get(locale)?.add(category.toString());
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
