import type {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import type { Author } from "./index";

import Image from "next/image";
import Markdown from "../../components/Markdown";
import { getContentItem, getSlugs } from "../../lib/content";

const contentType = "author";

export default function AuthorPage(props: { author: Author }) {
  return (
    <div>
      <h1>{props.author.name}</h1>
      {props.author.image && (
        <Image
          src={`/images/${props.author?.image}`}
          width={200}
          height={220}
        />
      )}
      <br />
      slug: {props.author.slug}
      <br />
      contentType: {props.author.contentType}
      <br />
      title: {props.author.title}
      <br />
      summary: {props.author.summary}
      <br />
      createdAt:{" "}
      {new Date(props.author.createdAt).toLocaleDateString(props.author.locale)}
      <br />
      modifiedAt:{" "}
      {new Date(props.author.modifiedAt).toLocaleDateString(
        props.author.locale
      )}
      <br />
      locale: {props.author.locale}
      <br />
      email: {props.author.email}
      <br />
      github: {props.author.github}
      <br />
      name: {props.author.name}
      <br />
      twitter: {props.author.twitter}
      <br />
      <Markdown>{props.author.body}</Markdown>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  locale,
  defaultLocale,
  params: { slug },
}: GetStaticPropsContext) {
  let author: Author = await getContentItem<Author>({
    locale: (locale ?? defaultLocale) as Locale,
    contentType,
    slug: slug as string,
  });

  return { props: { author } };
};

export const getStaticPaths: GetStaticPaths = async function ({
  locales,
}: GetStaticPathsContext) {
  let paths = [];
  let slugs = await getSlugs({ contentType });
  slugs.forEach((slug) => {
    locales.forEach((locale) => {
      paths.push({
        params: {
          slug,
        },
        locale,
      });
    });
  });

  return { paths, fallback: false };
};
