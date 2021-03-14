export function makeBrowseCategory({ postData }: { postData: PostData }) {
  return async function browseCategory({
    category,
    locale,
    maxPerPage,
  }: {
    category: string;
    locale: Locale;
    maxPerPage?: number;
  }) {
    const targetCategory = nonEmptyString("Category", category);
    const criteria = (post: PostFactory) =>
      post.language.locale === locale && post.category.equals(targetCategory);
    const found = await postData.find(criteria);
    const previews = sort.newToOld(found)?.map(preview) ?? [];
    maxPerPage = maxPerPage ?? previews.length;
    return paginate({ list: previews, maxPerPage });
  };
}

interface PostData {
  find(predicate: (p: PostFactory) => boolean): Promise<PostFactory[]>;
}

import { paginate } from "../helpers/paginate";
import { nonEmptyString } from "../../common/entities";
import { PostFactory } from "../entities";
import * as sort from "../helpers/sort";
import { preview } from "../helpers/preview";
