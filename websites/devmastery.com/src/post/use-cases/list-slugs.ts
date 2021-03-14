interface PostData {
  getSlugs: () => Promise<Set<string>>;
}

export function makeSlugList({ postData }: { postData: PostData }) {
  return async function listSlugs() {
    return Array.from(await postData.getSlugs());
  };
}
