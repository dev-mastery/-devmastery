import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import oembed from "@agentofuser/remark-oembed";
import { PluggableList } from "unified";
import SyntaxHighlighter from "react-syntax-highlighter";
import nightOwl from "react-syntax-highlighter/dist/cjs/styles/hljs/night-owl";
import type { ElementType } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { isHttpUrl, isYouTube } from "../lib/util";

const defaultImageSize = { width: 1000, height: 800 };

const baseRenderers = {
  code: renderCode,
  image: renderMedia,
};

export default function Markdown({
  children,
  plugins = [],
  renderers,
}: {
  children: string;
  plugins?: PluggableList;
  renderers?: { [nodeType: string]: ElementType };
}) {
  return (
    <ReactMarkdown
      renderers={{ ...baseRenderers, ...renderers }}
      children={children}
      plugins={[gfm, emoji, oembed, ...plugins]}
    />
  );
}

function renderCode({ language, value }) {
  nightOwl.hljs.borderRadius = 4;

  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      wrapLongLines={true}
      language={language}
      value={value}
      style={nightOwl}
    >
      {value}
    </SyntaxHighlighter>
  );
}

function renderMedia(props: { src: string; alt?: string }) {
  let url = props.src;
  if (ReactPlayer.canPlay(url)) {
    return renderVideo({ url });
  }
  return renderImage(props);
}

function renderImage(props: { src: string; alt?: string }) {
  let src: string;
  let url: URL;
  if (isHttpUrl({ url: props.src })) {
    src = props.src;
    url = new URL(src);
  }
  src = src ?? `/assets/${props.src}`;
  url = url ?? new URL(`http://fake.url/${src}`);

  let query = url.searchParams;
  let width = query.get("w") ?? query.get("width") ?? defaultImageSize.width;
  let height = query.get("h") ?? query.get("height") ?? defaultImageSize.height;
  return (
    <Image
      src={src}
      alt={props.alt}
      width={Number(width)}
      height={Number(height)}
    />
  );
}

function renderVideo({ url }: { url: string }) {
  return <ReactPlayer url={url} />;
}
