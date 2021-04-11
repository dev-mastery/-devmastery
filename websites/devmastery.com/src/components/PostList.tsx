import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { BiPlayCircle as PlayIcon } from "react-icons/bi";
import type { PostPreview } from "../post";

const PostGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto-fit; //minmax(660px, 1fr);
  grid-gap: 20px;
  justify-content: space-between;
  margin: 0 auto;
  position: relative;
`;

const PostTitle = styled.h2`
  font-size: 1.6rem;
  line-height: 2rem;
  margin: 0;
`;

const PostCard = styled.section`
  display: grid;
  grid-template-rows: auto;
  align-items: start;
  /* border: ${(props) => `solid 1px ${props.theme.colors.dark}`}; */
  background-color: ${(props) =>
    props.theme.mode === "dark"
      ? props.theme.colors.black
      : props.theme.colors.white};
  border-radius: 6px;
  width: 100%;
  height: 420px;

  cursor: pointer;
  &:nth-of-type(1) {
    grid-column: span 2;
    margin-top: -2px;
    &:active {
      margin-top: -2px;
      filter: drop-shadow(
        ${(props) =>
          `0px 0px 0px ${
            props.theme.mode === "dark"
              ? props.theme.colors.black
              : props.theme.colors.dark
          }`}
      );
    }
    /* margin-bottom: -2px; */
  }
  filter: drop-shadow(
    ${(props) =>
      `0px 0px 2px ${
        props.theme.mode === "dark"
          ? props.theme.colors.black
          : props.theme.colors.dark
      }`}
  );
  &:hover {
    margin-top: -2px;
    filter: drop-shadow(
      ${(props) =>
        `0px 0px 12px ${
          props.theme.mode === "dark"
            ? props.theme.colors.black
            : props.theme.colors.dark
        }`}
    );
  }
  &:active {
    margin-top: 0px;
    filter: drop-shadow(
      ${(props) =>
        `0px 0px 0px ${
          props.theme.mode === "dark"
            ? props.theme.colors.black
            : props.theme.colors.dark
        }`}
    );
  }
  /* transition: all 0.1s linear; */
  position: relative;
  user-select: none;
  & * img {
    border-radius: 6px;
  }
`;

const Summary = styled.p``;

const PostText = styled.div`
  border-radius: 6px;
  z-index: 10;
  position: relative;
  padding: 4rem;
  color: ${(props) =>
    props.theme.mode === "light"
      ? props.theme.colors.white
      : props.theme.colors.light};
  text-shadow: -1px 1px 2px rgba(0, 0, 0, 0.6);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 0) 100%
  );
`;

// const PostCategory = styled.small`
//   display: inline-block;
//   padding: 4px 1rem;
//   margin-bottom: 12px;
//   font-size: 0.8rem;
//   font-weight: 700;
//   text-transform: uppercase;
//   border: ${(props) => `solid 0.5px ${props.theme.colors.accent}`};
//   color: ${(props) => props.theme.colors.medium};
//   border-radius: 2px;
//   cursor: pointer;
//   &:hover {
//     background: ${(props) => props.theme.colors.soft};
//     color: ${(props) => props.theme.colors.dark};
//   }
// `;

const PostMeta = styled.small`
  border-radius: 2px;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 12px;
  padding: 4px 6px;
  text-transform: uppercase;
  user-select: none;
  background-color: rgba(37, 161, 142, 0.7);
`;

export type PostListProps = {
  posts: PostPreview[];
  t: { [key: string]: string };
};
export default React.memo(PostList);

function PostList({ posts, t }: PostListProps) {
  return (
    <PostGrid>
      {posts.map((post) => (
        <Link href={`posts/${post.slug}`} key={post.id}>
          <PostCard>
            <Image
              src={`/images/${post.slug}/${post.image?.src}`}
              layout="fill"
              objectFit="cover"
              alt={post.image?.alt}
            ></Image>
            {post.category === "Videos" ||
              (post.category === "Podcast" && (
                <PlayIcon
                  size="200"
                  opacity="0.5"
                  style={{
                    zIndex: 1000,
                    position: "relative",
                    margin: "auto",
                    width: "100%",
                    marginTop: "60px",
                  }}
                />
              ))}
            <PostText>
              <PostMeta>
                {/* {post.topic} • {post.durationInMinutes} {t["minutes"]} */}
                {post.topic}
              </PostMeta>
              <PostTitle>{post.title}</PostTitle>
              <small>
                {post.author} • {post.duration} {t["minutes"]}
              </small>
              <Summary>{post.summary}</Summary>
            </PostText>
          </PostCard>
        </Link>
      ))}
    </PostGrid>
  );
}
