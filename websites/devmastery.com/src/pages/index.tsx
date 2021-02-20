import React from "react";
import Hero from "../components/Hero";
import Image from "next/image";
import styled from "@emotion/styled";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { getPageText } from "../lib/translation";
import PostList from "../components/PostList";
import * as postService from "../post";

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

export default function Home(props: {
  // offer: Offer;
  posts: Awaited<ReturnType<typeof postService.browseLatest>>;
  text: { homepage: object };
}) {
  // let t = text.homepage ?? {};
  let posts = React.useMemo(() => props.posts, []);
  return (
    <>
      <PostList posts={posts} />
      {/* <Hero
        imageCaption={offer.imageCaption}
        imageSrc={offer.image}
        maxWidth="1366px"
      >
        <Markdown>{offer.body}</Markdown>
        <PrimaryButton>{offer.callToAction}</PrimaryButton>
      </Hero>
      // <PostList posts={posts} /> */}
    </>
  );
}

const maxPosts = 8;
export const getStaticProps: GetStaticProps = async function (
  props: GetStaticPropsContext
) {
  let locale = (props.locale ?? props.defaultLocale) as Locale;

  let text = await getPageText({
    locale,
    pageName: "homepage",
  });

  let posts = await postService.browseLatest({ locale, max: maxPosts });

  // let offer = await offers.getInitialOffer({ locale });
  // return { props: { offer, posts: postList, text } };
  return { props: { posts, text } };
};
