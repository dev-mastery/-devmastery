import { paginate, PagedResult } from "../helpers/paginate";
import { Category } from "../entities";
import { Post } from "../entities";
import * as sort from "../helpers/sort";
import { toPreview, PostPreview } from "../mappers/";

export function makeBrowseCategory({ postData }: { postData: PostData }) {
  return async function browseCategory({
    category,
    locale,
    maxPerPage,
  }: {
    category: string;
    locale: Locale;
    maxPerPage?: number;
  }): Promise<PagedResult<PostPreview>> {
    const targetCategory = Category.of(category);
    const found = await postData.findByCategory(targetCategory, locale);
    const previews = sort.newToOld(found)?.map(toPreview) ?? [];
    maxPerPage = maxPerPage ?? previews.length;
    return paginate({ list: previews, maxPerPage });
  };
}

interface PostData {
  findByCategory(category: Category, locale: Locale): Promise<Post[]>;
}
