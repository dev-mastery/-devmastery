import type { PostFactory } from "../entities";
import * as sort from "../helpers/sort";
import { preview } from "../helpers/preview";

interface PostData {
  find(predicate: (p: PostFactory) => boolean): Promise<PostFactory[]>;
}

export function makeBrowseLatest({ postData }: { postData: PostData }) {
  return async function browseLatest({
    locale,
    max,
  }: {
    locale: Locale;
    max: number;
  }) {
    const filter = (post: PostFactory) => post.language.locale == locale;
    const found = await postData.find(filter);
    return sort.newToOld(found)?.map(preview)?.slice(0, max) ?? [];
  };
}
