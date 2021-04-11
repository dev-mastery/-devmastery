import { makeBrowseCategory } from "./use-cases/browse-category";
import { makeBrowseLatest } from "./use-cases/browse-latest";
import { makeSlugList } from "./use-cases/list-slugs";
import { makeViewPost } from "./use-cases/view-post";
import { postData } from "./data-store";
export type { PostPreview } from "./mappers/to-preview";
export const browseCategory = makeBrowseCategory({ postData });
export const browseLatest = makeBrowseLatest({ postData });
export const viewPost = makeViewPost({ postData });
export const listSlugs = makeSlugList({ postData });

export type PostView = Awaited<ReturnType<typeof viewPost>>;
