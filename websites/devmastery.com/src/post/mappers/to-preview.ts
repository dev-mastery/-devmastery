import type { Post } from "../entities/Post";
import { ImageInfo } from "../../common/entities";

export interface PostPreview {
  id: string;
  author: string;
  authorSlug: string;
  category: string;
  duration: number;
  image?: ImageInfo;
  slug: string;
  summary: string;
  title: string;
  topic: string;
}

export function toPreview(post: Post): PostPreview {
  const { name: author, slug: authorSlug } = post.author.toJSON();
  return {
    id: post.id.toString(),
    author,
    authorSlug,
    category: post.category.toString(),
    duration: post.duration.minutes,
    image: post.image?.toJSON(),
    slug: post.slug.toString(),
    summary: post.summary.toString(),
    title: post.title.toString(),
    topic: post.topic.toString(),
  };
}
