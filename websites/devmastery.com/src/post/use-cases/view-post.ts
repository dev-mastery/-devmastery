import type { Post } from "../entities";
import {
  ContentId,
  contentIdFrom,
  slugOf,
  slugFrom,
} from "../../common/entities";

interface PostData {
  get(id: ContentId): Promise<Post>;
}

export function makeViewPost({ postData }: { postData: PostData }) {
  return async function viewPost(props: { slug: string; locale: Locale }) {
    let id = contentIdFrom({ slug: slugOf(props.slug), locale: props.locale });
    let post = await postData.get(id);
    if (!post) return null;

    let { contents, duration, ...meta } = post.toPlainObject();
    return Object.freeze({
      ...meta,
      authorSlug: slugFrom(meta.author).toString(),
      bodyAsHtml: post.contents.toHtml(),
      durationInMinutes: duration.minutes,
    });
  };
}
