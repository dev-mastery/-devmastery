import {
  ContentId,
  FullText,
  Slug,
  Image,
  Caption,
  URI,
} from "../../common/entities";
import { Markdown } from "../../markdown/entities/Markdown";
import {
  Author,
  Category,
  Duration,
  Post,
  Summary,
  Tag,
  Title,
  Topic,
} from "../entities";

interface FromMarkdownProps {
  dateCreated: number;
  dateModified: number;
  rawMarkdown: string;
  locale: Locale;
  translations?: Locale[];
  slug: string;
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

export function fromMarkdown({
  dateCreated,
  dateModified,
  rawMarkdown,
  locale,
  translations,
  slug,
}: FromMarkdownProps): Post {
  const markdown = Markdown.from<PostFrontmatter>(FullText.of(rawMarkdown));
  const frontmatter = markdown.frontmatter;

  return Post.of({
    author: Author.from(frontmatter.author),
    contents: markdown,
    category: Category.of(frontmatter.category),
    dateCreated: new Date(dateCreated),
    dateModified: new Date(dateModified),
    datePublished: new Date(frontmatter.datePublished ?? dateModified),
    duration: extractDuration({ frontmatter, markdown }),
    id: ContentId.from({ slug: Slug.of(slug), locale }),
    image: extractImage(frontmatter),
    locale,
    slug: Slug.of(slug),
    summary: extractSummary({ frontmatter, markdown }),
    tags: frontmatter.tags?.map(Tag.of),
    title: Title.of(frontmatter.title),
    topic: Topic.of(frontmatter.topic),
    translations,
  });
}

function extractSummary({
  frontmatter,
  markdown,
}: {
  frontmatter: PostFrontmatter;
  markdown: Markdown<PostFrontmatter>;
}) {
  return frontmatter.summary
    ? Summary.of(frontmatter.summary)
    : Summary.from(markdown.toPlainText());
}

function extractDuration({
  frontmatter,
  markdown,
}: {
  frontmatter: PostFrontmatter;
  markdown: Markdown<PostFrontmatter>;
}): Duration {
  return frontmatter.duration
    ? Duration.of(frontmatter.duration)
    : Duration.calculate(FullText.of(markdown.toPlainText()));
}

function extractImage(frontmatter: PostFrontmatter) {
  let image;
  if (frontmatter.image) {
    const imageUri = URI.of(frontmatter.image);
    const caption = frontmatter.imageCaption
      ? Caption.of(frontmatter.imageCaption)
      : undefined;
    image = Image.from({ uri: imageUri, caption });
  }
  return image;
}
