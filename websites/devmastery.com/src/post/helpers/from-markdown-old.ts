import {
  contentIdFrom,
  imageFrom,
  languageFrom,
  nonEmptyString,
  slugOf,
} from "../../common/entities";
import { postOf, durationFrom, minutesToRead, summaryFrom } from "../entities";
import { markdownFrom } from "../../common/helpers";

export function postFromMarkdown(props: {
  dateCreated: number;
  dateModified: number;
  markdown: string;
  locale: Locale;
  translations?: Locale[];
  slug: string;
}) {
  const markdown = markdownFrom<PostFrontmatter>(props.markdown);
  const { frontmatter } = markdown;
  const bodyText = markdown.toText();
  const slug = slugOf(props.slug);
  const imageUri = frontmatter.image
    ? nonEmptyString("PostFactory ImageFactory", frontmatter.image)
    : null;
  const imageCaption = frontmatter.imageCaption
    ? nonEmptyString(
        "PostFactory ImageFactory Caption",
        frontmatter.imageCaption
      )
    : undefined;
  const image = imageUri ? imageFrom(imageUri, imageCaption) : null;
  return postOf({
    author: nonEmptyString("PostFactory Author", frontmatter.author),
    category: nonEmptyString("PostFactory Category", frontmatter.category),
    dateCreated: new Date(props.dateCreated),
    dateModified: new Date(props.dateModified),
    datePublished: new Date(frontmatter.datePublished ?? props.dateModified),
    duration: frontmatter.duration
      ? durationFrom(frontmatter.duration)
      : minutesToRead(bodyText),
    id: contentIdFrom({ slug, locale: props.locale }),
    image,
    language: languageFrom(props.locale),
    slug,
    summary: summaryFrom(frontmatter.summary ?? bodyText),
    tags: frontmatter.tags ?? [],
    title: nonEmptyString("PostFactory Title", frontmatter.title),
    topic: nonEmptyString("PostFactory Topic", frontmatter.topic),
    contents: markdown,
  });
}

interface PostFrontmatter {
  author: string;
  category: string;
  datePublished: string;
  duration?: number;
  image?: string;
  imageCaption?: string;
  summary?: string;
  title: string;
  topic: string;
  tags?: string[];
}
