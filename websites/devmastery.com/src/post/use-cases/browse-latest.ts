import type { Post } from "../entities";
import * as sort from "../helpers/sort";
import { toPreview, PostPreview } from "../mappers";

interface PostData {
  findByLocale(locale: Locale): Promise<Post[]>;
}

export function makeBrowseLatest({ postData }: { postData: PostData }) {
  return async function browseLatest({
    locale,
    max,
  }: {
    locale: Locale;
    max: number;
  }): Promise<PostPreview[]> {
    const found = await postData.findByLocale(locale);
    return sort.newToOld(found)?.map(toPreview)?.slice(0, max) ?? [];
  };
}
