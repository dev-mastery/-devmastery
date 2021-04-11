import {
  GetStaticPaths,
  // GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { useRouter } from "next/router";

export default function TagList({
  allTags,
  selectedTags,
}: {
  allTags: string[];
  selectedTags: string[];
}): JSX.Element {
  const router = useRouter();
  return router.isFallback ? (
    <div>
      <br />
      <br />
      <br />
      Loading...
    </div>
  ) : (
    <ul>
      <br />
      <br />
      <br />
      {allTags.map((tag) => (
        <li
          key={tag}
          style={{ color: selectedTags.includes(tag) ? "red" : "black" }}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  // locale,
  // defaultLocale,
  params,
}: GetStaticPropsContext) {
  const allTags = ["a", "b", "c"];
  return {
    props: { selectedTags: params?.tags, allTags },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async function (): // _context: GetStaticPathsContext
Promise<{ paths: { params: { tags: string[] } }[]; fallback: true }> {
  const paths = [{ params: { tags: ["a"] } }];
  return { paths, fallback: true };
};
