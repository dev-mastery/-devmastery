import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { getContent, getContentItem } from "../lib/content";
import Markdown from "../components/Markdown";
import styles from "../styles/index.module.css";

import type { Content } from "../lib/content";

const contentType = "singleton";
const slug = "site-meta";
const postContentType = "post";
const { btn, container, bgWrap, bgText } = styles;

interface SiteMeta extends Content {
  logo: string;
  callToAction;
  copyright: string;
  imageCaption: string;
}

export default function Home({
  siteMeta,
  posts,
}: {
  siteMeta: SiteMeta;
  posts: Content[];
}) {
  return (
    <div>
      <Head>
        <title>
          {siteMeta.title} | {siteMeta.summary}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={container}>
        <h1>{siteMeta.title}</h1>
        {siteMeta.image && (
          <div className={bgWrap}>
            <Image
              alt={siteMeta.imageCaption}
              src={`/images/${siteMeta.image}`}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
            <section className={bgText}>
              <p>
                <Markdown>{siteMeta.body}</Markdown>
              </p>
              <a className={btn}>{siteMeta.callToAction}</a>
            </section>
          </div>
        )}

        <section>
          {posts &&
            posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <Markdown>{post.summary}</Markdown>
                <Markdown>{post.body}</Markdown>
                <small>
                  published:{" "}
                  {new Date(post.originallyPublished).toLocaleDateString(
                    post.locale
                  )}
                </small>
              </div>
            ))}
        </section>
      </main>

      <footer></footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  locale,
  defaultLocale: fallbackLocale,
}: GetStaticPropsContext) {
  let siteMeta: SiteMeta = await getContentItem<SiteMeta>({
    locale: locale ?? fallbackLocale,
    contentType,
    slug,
  });

  let posts = await getContent({
    contentType: postContentType,
    locale,
    fallbackLocale,
  });

  return { props: { siteMeta, posts } };
};
