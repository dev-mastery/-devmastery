import React from "react";
import Hero from "../components/Hero";
import Image from "next/image";
import styled from "@emotion/styled";
import { GetStaticProps, GetStaticPropsContext } from "next";
import * as Content from "../content";
import type { ContentItem } from "../content";
import Markdown from "../components/Markdown";
import { getPageText } from "../lib/translation";
import PostList from "../components/PostList";

const slug = "initial-offer";
const postContentType = "post";

interface Offer extends ContentItem {
  callToAction: string;
  imageCaption: string;
}

const PrimaryButton = styled.a`
  border: none;
  background-color: ${(props) => props.theme.colors.soft};
  padding: 12px;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.dark};
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
`;

const PageTitle = styled.h1`
  text-align: center;
  background-color: ${(props) => props.theme.colors.strong};
  color: ${(props) => props.theme.colors.white};
  margin-top: 0;
  padding: 6px;
  margin: 0;
`;

export default function Home({
  offer,
  posts,
  text,
}: {
  offer: Offer;
  posts: ContentItem[];
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
      <PostList posts={posts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  locale,
  defaultLocale,
}: GetStaticPropsContext) {
  let offer: Offer = (
    await Content.findBySlug({
      slug: "initial-offer",
      locale: locale as Locale,
    })
  )[0] as Offer;
  console.log(await Content.getCategories());
  let text = await getPageText({ locale, pageName: "homepage" });
  let posts = await Content.getLatest({
    type: "Post",
    max: 8,
    locale: (locale ?? defaultLocale) as Locale,
  });

  return { props: { offer, posts, text } };
};
