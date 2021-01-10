import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { BiPlayCircle as PlayIcon } from "react-icons/bi";
import type { ContentItem } from "../content";

const PostGrid = styled.div`
  display: grid;
  width: 96vw;
  max-width: 1400px;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  grid-gap: 2rem;
  justify-content: space-between;
  margin: 2rem auto;
  position: relative;
`;

const PostBlock = styled.section`
  /* display: grid; */
  grid-template-rows: auto;
  /* border: ${(props) => `solid 1px ${props.theme.colors.dark}`}; */
  background-color: ${(props) =>
    props.theme.mode === "dark"
      ? props.theme.colors.black
      : props.theme.colors.white};
  border-radius: 0 0 4px 4px;
  width: 100%;
  min-height: 640px;
  color: ${(props) =>
    props.theme.mode === "light"
      ? props.theme.colors.dark
      : props.theme.colors.light};
  cursor: pointer;
  &:nth-of-type(1) {
    grid-column: span 2;
  }
  box-shadow: ${(props) =>
    `0px 0px 2px ${
      props.theme.mode === "dark"
        ? props.theme.colors.black
        : props.theme.colors.dark
    }`};
  &:hover {
    margin-top: -1px;
    box-shadow: ${(props) =>
      `0px 0px 6px ${
        props.theme.mode === "dark"
          ? props.theme.colors.black
          : props.theme.colors.dark
      }`};
  }

  transition: box-shadow 0.3s, margin-top 0.3s;
`;

const PostTitle = styled.h2`
  font-size: 1.6rem;
  line-height: 2rem;
  margin: 0;
`;

const PostImage = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  user-select: none;
  border-radius: 16px;
`;

const PostSummary = styled.p``;

const PostText = styled.div`
  padding: 1rem;
`;

const PostCategory = styled.small`
  display: inline-block;
  padding: 4px 1rem;
  margin-bottom: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  border: ${(props) => `solid 0.5px ${props.theme.colors.accent}`};
  color: ${(props) => props.theme.colors.medium};
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.colors.soft};
    color: ${(props) => props.theme.colors.dark};
  }
`;

const PostMeta = styled.small`
  border-radius: 2px;
  color: ${(props) => props.theme.colors.medium};
  cursor: pointer;
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 6px;
  padding: 4px 1rem 4px 0;
  text-transform: uppercase;
  user-select: none;
`;

export default function PostList({ posts }: { posts: ContentItem[] }) {
  return (
    <PostGrid>
      {posts.map((post) => (
        <Link href={`posts/${post.slug}`} key={post.id}>
          <PostBlock>
            <PostImage>
              <Image
                src={`/images/${post.slug}/${post.image}`}
                layout="fill"
                objectFit="cover"
              ></Image>
              {post.section === "Videos" ||
                (post.section === "Podcasts" && (
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
            </PostImage>
            <PostText>
              <PostMeta>
                {post.topic} | {Math.round(post.length)} minutes
              </PostMeta>
              {/* <PostCategory>{post.category}</PostCategory> */}
              <PostTitle>{post.title}</PostTitle>
              <PostSummary>{post.summary}</PostSummary>
            </PostText>
          </PostBlock>
        </Link>
      ))}
    </PostGrid>
  );
}
