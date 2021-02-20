import { Post } from "../entities";

export function newToOld(posts: Post[]) {
  return posts?.sort(
    (a: Post, b: Post) => b.datePublished.getTime() - a.datePublished.getTime()
  );
}
