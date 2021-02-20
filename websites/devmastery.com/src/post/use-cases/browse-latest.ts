import { Post } from "../entities";
import * as sort from "../helpers/sort";
import { preview } from "../helpers/preview";

interface PostData {
  find(predicate: (p: Post) => boolean): Promise<Post[]>;
}

export function makeBrowseLatest({ postData }: { postData: PostData }) {
  return async function browseLatest({
    locale,
    max,
  }: {
    locale: Locale;
    max: number;
  }) {
    let filter = (post: Post) => post.language.locale == locale;
    let found = await postData.find(filter);
    return sort.newToOld(found)?.map(preview)?.slice(0, max) ?? [];
  };
}
