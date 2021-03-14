import type {
  ContentId,
  Image,
  ImageInfo,
  Language,
  LanguageInfo,
  Slug,
} from "../../common/entities";
import type { Author, AuthorInfo } from "./Author";
import type { Category } from "./Category";
import type { Duration, DurationInfo } from "./Duration";
import type { Summary } from "./Summary";
import type { Tag } from "./Tag";
import type { Title } from "./Title";
import type { Topic } from "./Topic";

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "long",
  year: "numeric",
  day: "numeric",
};

interface PostContentInfo {
  asPlainText: string;
  asHtml: string;
}

interface PostContents {
  toJSON(): PostContentInfo;
}

interface PostProps {
  author: Author;
  contents: PostContents;
  category: Category;
  dateCreated: Date;
  dateModified: Date;
  datePublished: Date;
  duration: Duration;
  id: ContentId;
  image: Image;
  language: Language;
  slug: Slug;
  summary: Summary;
  tags?: Tag[];
  title: Title;
  topic: Topic;
}

export interface PostInfo {
  author: AuthorInfo;
  contents: PostContentInfo;
  category: string;
  dateCreated: string;
  dateModified: string;
  datePublished: string;
  duration: DurationInfo;
  id: string;
  image: ImageInfo;
  language: LanguageInfo;
  slug: string;
  summary: string;
  tags?: string[];
  title: string;
  topic: string;
}

export class Post {
  readonly #author;
  readonly #contents;
  readonly #category;
  readonly #dateCreated;
  readonly #dateModified;
  readonly #datePublished;
  readonly #duration;
  readonly #id;
  readonly #image;
  readonly #language;
  readonly #slug;
  readonly #summary;
  readonly #tags: string[] | undefined;
  readonly #title;
  readonly #topic;

  private constructor(props: PostProps) {
    this.#author = props.author;
    this.#contents = props.contents;
    this.#category = props.category.toString();
    this.#dateCreated = props.dateCreated;
    this.#dateModified = props.dateModified;
    this.#datePublished = props.datePublished;
    this.#duration = props.duration;
    this.#id = props.id.toString();
    this.#image = props.image;
    this.#language = props.language;
    this.#slug = props.slug.toString();
    this.#summary = props.summary.toString();
    this.#tags = props.tags?.map((tag) => tag.toString());
    this.#title = props.title.toString();
    this.#topic = props.topic.toString();
  }

  public static of(props: PostProps): Post {
    return new Post(props);
  }

  public toJSON(): PostInfo {
    return {
      author: this.author.toJSON(),
      contents: this.contents.toJSON(),
      category: this.category,
      dateCreated: this.dateCreated.toLocaleString(
        this.language.locale,
        DATE_OPTIONS
      ),
      dateModified: this.dateModified.toLocaleString(
        this.language.locale,
        DATE_OPTIONS
      ),
      datePublished: this.datePublished.toLocaleString(
        this.language.locale,
        DATE_OPTIONS
      ),
      duration: this.duration.toJSON(),
      id: this.id,
      image: this.image.toJSON(),
      language: this.language.toJSON(),
      slug: this.slug,
      summary: this.summary,
      tags: this.tags,
      title: this.title,
      topic: this.topic,
    };
  }

  public get author(): Author {
    return this.#author;
  }

  public get contents(): PostContents {
    return this.#contents;
  }

  public get category(): string {
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

  public get id(): string {
    return this.#id;
  }

  public get image(): Image {
    return this.#image;
  }

  public get language(): Language {
    return this.#language;
  }

  public get slug(): string {
    return this.#slug;
  }

  public get summary(): string {
    return this.#summary;
  }

  public get tags(): string[] | undefined {
    return this.#tags;
  }

  public get title(): string {
    return this.#title;
  }

  public get topic(): string {
    return this.#topic;
  }
}
