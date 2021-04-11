import type { Post, PostInfo } from "../entities";
import { ContentId, Slug } from "../../common/entities";

interface PostData {
  get(id: ContentId): Promise<Post | null>;
  findByLocale(locale: Locale): Promise<Post[]>;
}

type PostView = Omit<PostInfo, "author" | "contents" | "duration"> & {
  author: string;
  authorSlug: string;
  bodyAsHtml: string;
  durationInMinutes: number;
};
export function makeViewPost({ postData }: { postData: PostData }) {
  return async function viewPost(props: {
    slug: string;
    locale: Locale;
  }): Promise<PostView | null> {
    const id = ContentId.from({
      slug: Slug.of(props.slug),
      locale: props.locale,
    });
    const post = await postData.get(id);
    if (!post) return null;

    const { author, contents, duration, ...meta } = post.toJSON();
    return Object.freeze({
      ...meta,
      author: author.name,
      authorSlug: author.slug,
      bodyAsHtml: contents.html,
      durationInMinutes: duration.minutes,
    });
  };
}
