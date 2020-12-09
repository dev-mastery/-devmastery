import React from "react";
import Hero from "../components/Hero";
import Image from "next/image";
import styled from "styled-components";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { getContentItem, getContent, Content } from "../lib/content";
import Markdown from "../components/Markdown";
import { getPageText } from "../lib/translation";

const contentType = "offer";
const slug = "initial";
const postContentType = "post";

interface Offer extends Content {
  callToAction: string;
  imageCaption: string;
}

const PrimaryButton = styled.a`
  border: none;
  /* background-color: aquamarine; */
  /* background-color: #049948; */
  background-color: #9fffcb;
  padding: 12px;
  font-size: 1.1rem;
  color: #000;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
`;

const PostList = styled.div`
  width: 100vw;
`;

const PostFrame = styled.section`
  display: grid;
  padding: 0;
  min-height: 200px;
  justify-content: center;
  align-content: center;
  background-color: white;
  :nth-child(even) {
    background-color: whitesmoke;
  }
`;

const PostSummary = styled.section`
  padding: 64px 12px;
  max-width: 36rem;
  font-size: 1rem;
  line-height: 1.4rem;
`;

const PostTitle = styled.h2`
  font-size: 1.8rem;
  line-height: 2rem;
  margin: 0;
`;

const PageTitle = styled.h1`
  text-align: center;
  /* background-color: whitesmoke; */
  background-color: #25a18e;
  background-color: #004e64;
  color: white;
  margin-top: 0;
  padding: 6px;
  margin: 0;
  /* text-transform: uppercase; */
  /* text-decoration: underline; */
`;

export default function Home({
  offer,
  posts,
  text,
}: {
  offer: Offer;
  posts: Content[];
  text: { homepage: object };
}) {
  let t = text.homepage ?? {};
  return (
    <>
      <Hero
        imageCaption={offer.imageCaption}
        imageSrc={offer.image}
        maxWidth="1366px"
      >
        <Markdown>{offer.body}</Markdown>
        <PrimaryButton>{offer.callToAction}</PrimaryButton>
      </Hero>
      <PageTitle>{t["title"]}</PageTitle>
      <PostList>
        {posts.map((post) => (
          <PostFrame key={post.id}>
            <PostSummary>
              <PostTitle>{post.title}</PostTitle>
              <Markdown>{post.summary}</Markdown>
            </PostSummary>
          </PostFrame>
        ))}
      </PostList>
    </>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  locale,
  defaultLocale,
}: GetStaticPropsContext) {
  let offer: Offer = await getContentItem<Offer>({
    locale: locale ?? defaultLocale,
    contentType,
    slug,
  });

  let text = await getPageText({ locale, pageName: "homepage" });
  console.log(text);
  let posts = (
    await getContent({
      contentType: postContentType,
      locale,
      fallbackLocale: defaultLocale,
    })
  ).sort(
    (a: Offer, b: Offer) =>
      (b.originallyPublished as number) - (a.originallyPublished as number)
  );

  return { props: { offer, posts, text } };
};
