import type {
  NonEmptyString,
  ContentId,
  Language,
  SlugFactory,
  ImageFactory,
} from "../../common/entities";
import type { SummaryFactory } from "./summary-factory";
import type { DurationFactory } from "./duration-factory";

const dateOptions: Intl.DateTimeFormatOptions = {
  month: "long",
  year: "numeric",
  day: "numeric",
};

interface PostContents {
  toString(): string;
  toHtml(): string;
}

export function postOf(props: {
  author: NonEmptyString;
  contents: PostContents;
  category: NonEmptyString;
  dateCreated: Date;
  dateModified: Date;
  datePublished?: Date;
  duration: DurationFactory;
  id: ContentId;
  image?: ImageFactory;
  language: Language;
  slug: SlugFactory;
  summary: SummaryFactory;
  tags?: string[];
  title: NonEmptyString;
  topic: NonEmptyString;
}) {
  function toPlainObject() {
    return Object.freeze({
      author: props.author.toString(),
      category: props.category.toString(),
      dateCreated: props.dateCreated.toLocaleDateString(
        props.language.locale,
        dateOptions
      ),
      dateModified: props.dateModified.toLocaleDateString(
        props.language.locale,
        dateOptions
      ),
      datePublished: props.datePublished.toLocaleDateString(
        props.language.locale,
        dateOptions
      ),
      duration: props.duration.toPlainObject(),
      id: props.id.toString(),
      image: props.image,
      language: props.language,
      slug: props.slug.toString(),
      summary: props.summary.toString(),
      tags: props.tags,
      title: props.title.toString(),
      topic: props.topic.toString(),
      contents: props.contents.toString(),
    });
  }

  return Object.freeze({
    ...props,
    toPlainObject,
  });
}

export type PostFactory = ReturnType<typeof postOf>;
