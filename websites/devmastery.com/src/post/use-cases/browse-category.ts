import { paginate } from "../helpers/paginate";
import { nonEmptyString } from "../../common/entities";
import { Post } from "../entities";
import * as sort from "../helpers/sort";
import { preview } from "../helpers/preview";

interface PostData {
  find(predicate: (p: Post) => boolean): Promise<Post[]>;
}

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
    let targetCategory = nonEmptyString("Category", category);
    let criteria = (post: Post) =>
      post.language.locale == locale && post.category.equals(targetCategory);
    let found = await postData.find(criteria);
    let previews = sort.newToOld(found)?.map(preview) ?? [];
    maxPerPage = maxPerPage ?? previews.length;
    return paginate({ list: previews, maxPerPage });
  };
}
