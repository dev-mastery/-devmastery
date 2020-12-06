import React from "react";
import Hero from "../components/Hero";
import Image from "next/image";
import styled from "styled-components";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { getContentItem, getContent, Content } from "../lib/content";
import Markdown from "../components/Markdown";
import { getPageText, getNamespaceText } from "../lib/translation";

const contentType = "offer";
const slug = "initial";
const postContentType = "post";

interface Offer extends Content {
  callToAction: string;
  imageCaption: string;
}

const PrimaryButton = styled.a`
  border: none;
  background-color: aquamarine;
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
  padding: 12px 0;
  min-height: 200px;
  justify-content: center;
  align-content: center;
  background-color: white;
  :nth-child(even) {
    background-color: whitesmoke;
  }
`;

const PostSummary = styled.section`
  padding: 12px;
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
  background-color: whitesmoke;
  margin-top: 0;
  padding: 12px;
  /* text-transform: uppercase; */
  /* text-decoration: underline; */
`;

export default function Home({
  offer,
  posts,
  t,
}: {
  offer: Offer;
  posts: Content[];
  t: { homepage: { title: string } };
}) {
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
      <PageTitle>{t?.homepage?.title}</PageTitle>
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
  defaultLocale: fallbackLocale,
}: GetStaticPropsContext) {
  let offer: Offer = await getContentItem<Offer>({
    locale: locale ?? fallbackLocale,
    contentType,
    slug,
  });
  let menuText = getNamespaceText({
    locale,
    fallbackLocale,
    namespace: "menu",
  });
  let footerText = getNamespaceText({
    locale,
    fallbackLocale,
    namespace: "footer",
  });
  let t = getPageText({ locale, fallbackLocale, pageName: "homepage" });
  console.log(t);
  let posts = (
    await getContent({
      contentType: postContentType,
      locale,
      fallbackLocale,
    })
  ).sort(
    (a: Offer, b: Offer) =>
      (b.originallyPublished as number) - (a.originallyPublished as number)
  );

  return { props: { offer, posts, menuText, footerText, t } };
};
