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
  let markdown = markdownFrom<PostFrontmatter>(props.markdown);
  let { frontmatter } = markdown;
  let bodyText = markdown.toText();
  let slug = slugOf(props.slug);
  let imageUri = frontmatter.image
    ? nonEmptyString("Post Image", frontmatter.image)
    : null;
  let imageCaption = frontmatter.imageCaption
    ? nonEmptyString("Post Image Caption", frontmatter.imageCaption)
    : undefined;
  let image = imageUri ? imageFrom(imageUri, imageCaption) : null;
  return postOf({
    author: nonEmptyString("Post Author", frontmatter.author),
    category: nonEmptyString("Post Category", frontmatter.category),
    dateCreated: new Date(props.dateCreated),
    dateModified: new Date(props.dateModified),
    datePublished: new Date(frontmatter.datePublished ?? props.dateModified),
    duration: frontmatter.duration
      ? durationFrom(frontmatter.duration)
      : minutesToRead(bodyText),
    id: contentIdFrom({ slug, locale: props.locale }),
    image,
    language: languageFrom(props.locale as Locale),
    slug,
    summary: summaryFrom(frontmatter.summary ?? bodyText),
    tags: frontmatter.tags ?? [],
    title: nonEmptyString("Post Title", frontmatter.title),
    topic: nonEmptyString("Post Topic", frontmatter.topic),
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
