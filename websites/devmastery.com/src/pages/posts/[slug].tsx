import type {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import type { ContentItem } from "../../content";
import * as Content from "../../content";
import Markdown from "../../components/Markdown";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import {
  MdTranslate as TranslateIcon,
  MdModeEdit as EditIcon,
  MdFormatSize as TextSizeIcon,
  MdModeComment as CommentIcon,
  MdFavorite as FavoritedIcon,
  MdFavoriteBorder as FavoriteIcon,
  MdMail as MailIcon,
} from "react-icons/md";
import {
  FaReddit as RedditIcon,
  FaTwitter as TwitterIcon,
  FaGithub as GithubIcon,
  FaFacebook as FacebookIcon,
} from "react-icons/fa";
import { useRouter } from "next/router";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";

const Post = styled.article`
  width: 96vw;
  max-width: 36rem;
  font-size: 21px;
  line-height: 1.8rem;
  margin: 2rem auto;
  color: ${(props) =>
    props.theme.mode === "dark"
      ? props.theme.colors.light
      : props.theme.colors.dark};
  & > p,
  h2,
  ul {
    margin-bottom: 32px;
    /* padding-left: 5rem;
    padding-right: 5rem; */
  }
  & > * a {
    color: ${(props) =>
      props.theme.mode === "dark"
        ? props.theme.colors.brand
        : props.theme.colors.accent};
    text-decoration: underline;
  }
  font-family: ${(props) => props.theme.fonts.body};
`;

const PostTitle = styled.h1`
  font-size: 50px;
  line-height: 1;
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: 300;
  margin-bottom: 18px;
  margin-top: 0;
  text-align: center;
`;

const PostByline = styled.small`
  margin-bottom: 18px;
  display: block;
  font-weight: 200;
  letter-spacing: 1px;
  text-align: center;
`;

const PostMeta = styled.small`
  color: ${(props) => props.theme.colors.medium};
  cursor: pointer;
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  /* padding: 4px 1rem 4px 0; */
  text-align: center;
  text-transform: uppercase;
  user-select: none;
`;

const PostImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  user-select: none;
  margin-bottom: 18px;
`;

const PostToolbar = styled.div`
  display: grid;
  justify-content: center;
  /* padding: 3px 0; */
  width: 100%;
  /* box-shadow: 0 0 2px; */
  /* background-color: ${(props) => props.theme.colors.white}; */
  /* border-top: solid 1px ${(props) => props.theme.colors.medium};
  border-bottom: solid 1px ${(props) => props.theme.colors.medium}; */
  /* border: solid 1px ${(props) => props.theme.colors.medium}; */
  border-radius: 4px;
`;

const PostTools = styled.span`
  display: grid;
  grid-gap: 36px;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  width: 460px;
  justify-items: center;
  align-items: center;
`;
function getCurrentUrl() {
  if (typeof window !== "undefined") {
    return window.location.href;
  }
}
export default function PostPage({ post }: { post: ContentItem }) {
  let router = useRouter();

  return (
    <Post>
      <PostTitle>{post.title}</PostTitle>
      <PostByline>
        {post.author} ✦ {post.datePublished} ✦ {post.length} minutes
      </PostByline>

      <PostImage>
        <Image
          src={`/images/${post.slug}/${post.image}`}
          layout="fill"
          objectFit="cover"
        ></Image>
      </PostImage>
      <PostToolbar>
        <PostTools>
          <EmailShareButton url={getCurrentUrl()}>
            <MailIcon size={20} />
          </EmailShareButton>
          <TwitterShareButton url={getCurrentUrl()}>
            <TwitterIcon size={20} />
          </TwitterShareButton>
          <RedditShareButton url={getCurrentUrl()}>
            <RedditIcon size={20} />
          </RedditShareButton>

          <FacebookShareButton url={getCurrentUrl()}>
            <FacebookIcon size={20} />
          </FacebookShareButton>
          <TextSizeIcon size={20} />
          <Link
            href={`https://github.com/dev-mastery/devmastery/tree/main/websites/devmastery.com/documents/${post.slug}/index.${post.locale}.md`}
          >
            <GithubIcon size={20} />
          </Link>
          <TranslateIcon size={20} />
        </PostTools>
      </PostToolbar>
      <Markdown>{post.body}</Markdown>
    </Post>
  );
}

export const getStaticProps: GetStaticProps = async function ({
  locale,
  defaultLocale,
  params,
}: GetStaticPropsContext) {
  let posts: ContentItem[] = await Content.findBySlug({
    slug: params.slug as string,
    locale: locale as Locale,
  });
  if (!posts?.length) {
    posts = await Content.findBySlug({
      slug: params.slug as string,
      locale: defaultLocale as Locale,
    });
  }
  let post = posts[0];
  return {
    notFound: post == null,
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async function (
  _context: GetStaticPathsContext
) {
  let slugs = await Content.getSlugs({ type: "Post" });
  let paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};
