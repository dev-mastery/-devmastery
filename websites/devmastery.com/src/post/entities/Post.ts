import type { Image, ImageInfo, Slug } from "../../common/entities";
import { ContentId } from "../../common/entities";
import type { Author, AuthorInfo } from "./Author";
import type { Category } from "./Category";
import type { Duration, DurationInfo } from "./Duration";
import type { Markdown, MarkdownInfo } from "../../markdown/entities/Markdown";
import type { Summary } from "./Summary";
import type { Tag } from "./Tag";
import type { Title } from "./Title";
import type { Topic } from "./Topic";

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "long",
  year: "numeric",
  day: "numeric",
};

interface PostProps {
  author: Author;
  category: Category;
  contents: Markdown<unknown>;
  dateCreated: Date;
  dateModified: Date;
  datePublished: Date;
  duration: Duration;
  id: ContentId;
  image?: Image;
  locale: Locale;
  otherLocales?: Locale[];
  slug: Slug;
  summary: Summary;
  tags?: Tag[];
  title: Title;
  topic: Topic;
}

export interface PostInfo {
  author: AuthorInfo;
  category: string;
  contents: MarkdownInfo;
  dateCreated: string;
  dateModified: string;
  datePublished: string;
  duration: DurationInfo;
  id: string;
  image?: ImageInfo;
  locale: Locale;
  otherLocales?: Locale[];
  slug: string;
  summary: string;
  tags?: string[];
  title: string;
  topic: string;
}

export class Post {
  readonly #author;
  readonly #category;
  readonly #contents;
  readonly #dateCreated;
  readonly #dateModified;
  readonly #datePublished;
  readonly #duration;
  readonly #id;
  readonly #image;
  readonly #locale;
  readonly #otherLocales;
  readonly #slug;
  readonly #summary;
  readonly #tags;
  readonly #title;
  readonly #topic;

  private constructor(props: PostProps) {
    this.#author = props.author;
    this.#category = props.category;
    this.#contents = props.contents;
    this.#dateCreated = props.dateCreated;
    this.#dateModified = props.dateModified;
    this.#datePublished = props.datePublished;
    this.#duration = props.duration;
    this.#id =
      props.id ?? ContentId.from({ slug: props.slug, locale: props.locale });
    this.#image = props.image;
    this.#locale = props.locale;
    this.#otherLocales = new Set<Locale>(props.otherLocales);
    this.#slug = props.slug;
    this.#summary = props.summary;
    this.#tags = props.tags;
    this.#title = props.title;
    this.#topic = props.topic;
  }

  public static of(props: PostProps): Post {
    return new Post(props);
  }

  public addLocale(locale: Locale): void {
    this.#otherLocales.add(locale);
  }

  public toJSON(): PostInfo {
    return {
      author: this.author.toJSON(),
      contents: this.contents.toJSON(),
      category: this.category.toString(),
      dateCreated: this.dateCreated.toLocaleString(this.locale, DATE_OPTIONS),
      dateModified: this.dateModified.toLocaleString(this.locale, DATE_OPTIONS),
      datePublished: this.datePublished.toLocaleString(
        this.locale,
        DATE_OPTIONS
      ),
      duration: this.duration.toJSON(),
      id: this.id.toString(),
      image: this.image?.toJSON(),
      locale: this.locale,
      slug: this.slug.toString(),
      summary: this.summary.toString(),
      tags: this.tags.map((t) => t.toString()),
      title: this.title.toString(),
      topic: this.topic.toString(),
      otherLocales: Array.from(this.otherLocales),
    };
  }

  public get author(): Author {
    return this.#author;
  }

  public get contents(): Markdown<unknown> {
    return this.#contents;
  }

  public get category(): Category {
    return this.#category;
  }

  public get dateCreated(): Date {
    return this.#dateCreated;
  }

  public get dateModified(): Date {
    return this.#dateModified;
  }

  public get datePublished(): Date {
    return this.#datePublished;
  }

  public get duration(): Duration {
    return this.#duration;
  }

  public get id(): ContentId {
    return this.#id;
  }

  public get image(): Image | undefined {
    return this.#image;
  }

  public get locale(): Locale {
    return this.#locale;
  }

  public get slug(): Slug {
    return this.#slug;
  }

  public get summary(): Summary {
    return this.#summary;
  }

  public get tags(): Readonly<Tag[]> {
    return Object.freeze(this.#tags ?? []);
  }

  public get title(): Title {
    return this.#title;
  }

  public get topic(): Topic {
    return this.#topic;
  }

  public get otherLocales(): Readonly<Locale[]> {
    return Array.from(this.#otherLocales);
  }
}
