import React from "react";
import Hero from "../components/Hero";
import Image from "next/image";
import styled from "@emotion/styled";
import { GetStaticProps, GetStaticPropsContext } from "next";
import PostList from "../components/PostList";
import * as labels from "../label";
import * as posts from "../post";

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

const Container = styled.section`
  margin: 2rem auto;
  width: 96vw;
  max-width: 1400px;
`;

const PageTitle = styled.h1`
  width: 96vw;
  max-width: 1400px;
  color: ${(props) =>
    props.theme.mode === "dark"
      ? props.theme.colors.light
      : props.theme.colors.dark};
  margin: 36px auto 18px auto;
  line-height: 1.3;
  text-indent: 12px;
  padding: 0;
  border-radius: 2px;
  border-bottom: solid 2px ${(props) => props.theme.colors.primary};
  /* text-transform: lowercase; */
  /* border-top: solid 2px ${(props) => props.theme.colors.primary}; */
`;

export default function Home(props: {
  // offer: Offer;
  postList: Awaited<ReturnType<typeof posts.browseLatest>>;
  t: { [key: string]: string };
}) {
  // let t = text.homepage ?? {};
  let postList = React.useMemo(() => props.postList, []);
  let t = React.useMemo(() => props.t, []);
  return (
    <Container>
      {/* <PageTitle>Recent Posts by Bill Sourour</PageTitle> */}
      <PostList posts={postList} t={t} />
      {/* <Hero
        imageCaption={offer.imageCaption}
        imageSrc={offer.image}
        maxWidth="1366px"
      >
        <Markdown>{offer.body}</Markdown>
        <PrimaryButton>{offer.callToAction}</PrimaryButton>
      </Hero>
      // <PostList posts={posts} /> */}
    </Container>
  );
}

const maxPosts = 7;
export const getStaticProps: GetStaticProps = async function (
  props: GetStaticPropsContext
) {
  let locale = (props.locale ?? props.defaultLocale) as Locale;

  let postList = await posts.browseLatest({ locale, max: maxPosts });
  let t = await labels.translate({ namespaces: ["post"], locale });
  // let offer = await offers.getInitialOffer({ locale });
  // return { props: { offer, posts: postList, text } };
  return { props: { postList, t, menuItems: [] } };
};
