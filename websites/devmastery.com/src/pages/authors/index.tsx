import type { Content } from "../../lib/content";
import { getContent } from "../../lib/content";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Markdown from "../../components/Markdown";

const contentType = "author";
export interface Author extends Content {
  name: string;
  email?: string;
  github?: string;
  twitter?: string;
}

export default function Authors({ authors }: { authors: Author[] }) {
  return (
    <ul>
      {authors.map((author) => (
        <li key={author.id}>
          <h3>{author.name}</h3>
          <Markdown>{author.summary}</Markdown>
        </li>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  locale,
  defaultLocale: fallbackLocale,
}: GetStaticPropsContext) {
  let authors: Author[] = await getContent<Author>({
    locale,
    contentType,
    fallbackLocale,
  });
  return { props: { authors } };
};
