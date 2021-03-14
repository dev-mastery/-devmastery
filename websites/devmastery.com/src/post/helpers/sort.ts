import { PostFactory } from "../entities";

export function newToOld(posts: PostFactory[]) {
  return posts?.sort(
    (a: PostFactory, b: PostFactory) =>
      b.datePublished.getTime() - a.datePublished.getTime()
  );
}
