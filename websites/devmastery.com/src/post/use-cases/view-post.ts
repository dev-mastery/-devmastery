import type { PostFactory } from "../entities";
import {
  ContentId,
  contentIdFrom,
  slugOf,
  slugFrom,
} from "../../common/entities";

interface PostData {
  get(id: ContentId): Promise<PostFactory>;
}

export function makeViewPost({ postData }: { postData: PostData }) {
  return async function viewPost(props: { slug: string; locale: Locale }) {
    const id = contentIdFrom({
      slug: slugOf(props.slug),
      locale: props.locale,
    });
    const post = await postData.get(id);
    if (!post) return null;

    const { contents, duration, ...meta } = post.toPlainObject();
    return Object.freeze({
      ...meta,
      authorSlug: slugFrom(meta.author).toString(),
      bodyAsHtml: post.contents.toHtml(),
      durationInMinutes: duration.minutes,
    });
  };
}
