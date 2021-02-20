import { slugFrom } from "../../common/entities";
import { Post } from "../entities";

export type PreviewFn = typeof preview;
export type PostPreview = ReturnType<PreviewFn>;

export function preview(post: Post) {
  return Object.freeze({
    author: post.author.toString(),
    authorSlug: slugFrom(post.author.toString()).toString(),
    category: post.category.toString(),
    durationInMinutes: post.duration.toPlainObject().minutes,
    id: post.id.toString(),
    image: post.image,
    language: post.language,
    slug: post.slug.toString(),
    summary: post.summary.toString(),
    title: post.title.toString(),
    topic: post.topic?.toString(),
  });
}
