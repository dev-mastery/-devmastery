import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import { PluggableList } from "unified";
import SyntaxHighlighter from "react-syntax-highlighter";
import type { ElementType } from "react";
import Image from "next/image";
import ReactPlayer from "react-player";

const defaultImageSize = { width: 1000, height: 800 };
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
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
}): JSX.Element {
  return (
    <ReactMarkdown
      renderers={{ ...baseRenderers, ...renderers }}
      children={children}
      plugins={[gfm, emoji, ...plugins]}
    />
  );
}

function renderCode({ language, value }: { language: string; value: string }) {
  return (
    <SyntaxHighlighter
      showLineNumbers={false}
      wrapLongLines={false}
      language={language}
      useInlineStyles={false}
    >
      {value}
    </SyntaxHighlighter>
  );
}

function renderMedia(props: { src: string; alt?: string }) {
  const url = props.src;
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
  } else {
    src = `/images/${props.src}`;
    url = new URL(`http://fake.url/${src}`);
  }

  const query = url.searchParams;
  const width = query.get("w") ?? query.get("width") ?? defaultImageSize.width;
  const height =
    query.get("h") ?? query.get("height") ?? defaultImageSize.height;
  return (
    <p style={{ textAlign: "center" }}>
      <Image
        src={src}
        alt={props.alt}
        width={toNearestSize(deviceSizes, Number(width))}
        height={Number(height)}
      />
    </p>
  );
}

function renderVideo({ url }: { url: string }) {
  return <ReactPlayer url={url} />;
}

function toNearestSize(sizes: number[], value: number) {
  const min = Math.min(...sizes);
  if (value <= min) return min;

  const max = Math.max(...sizes);
  if (value >= max) return max;

  return [...sizes]
    .sort((a, b) => a - b)
    .reduce((acc, size) => (acc >= size ? size : acc), value);
}

export function isHttpUrl({ url }: { url: string }): boolean {
  const urlRe = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/i;
  return urlRe.test(url);
}

export function isYouTube({ url }: { url: string }): boolean {
  const { host, pathname, searchParams } = new URL(url);

  return (
    host === "youtu.be" ||
    (["youtube.com", "www.youtube.com"].includes(host) &&
      pathname.includes("/watch") &&
      Boolean(searchParams.get("v")))
  );
}
