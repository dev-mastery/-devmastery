import { Slug } from "../../common/entities";

interface PostData {
  getSlugs: () => Promise<Slug[]>;
}

export function makeSlugList({ postData }: { postData: PostData }) {
  return async function listSlugs(): Promise<string[]> {
    const slugs = await postData.getSlugs();
    return slugs.map((s) => s.toString());
  };
}
