import unified from "unified";
import remark from "remark-parse";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import rehype from "remark-rehype";
import sanitizer from "rehype-sanitize";
import raw from "rehype-raw";
import urls from "rehype-urls";
import codeblocks from "rehype-highlight";
import html from "rehype-stringify";

const merge = require("deepmerge");
const gh = require("hast-util-sanitize/lib/github");

const schema = merge(gh, { attributes: { "*": ["className"] } });

export function mdToHtml(markdown: string) {
  return unified()
    .use(remark)
    .use(emoji)
    .use(gfm)
    .use(rehype, { allowDangerousHtml: true })
    .use(raw)
    .use(codeblocks)
    .use(sanitizer, schema)
    .use(urls, handleMedia)
    .use(html)
    .processSync(markdown)
    .contents.toString();
}

interface HastNode {
  type: string;
  tagName: string;
  properties: { [propName: string]: string | boolean | string[] };
  children: HastNode[];
}

interface HastImageNode extends HastNode {
  properties: {
    src: string;
    srcSet?: string;
    decode?: string;
    sizes?: string;
    height: string;
    width: string;
  };
}

function handleMedia(url: URL, node: HastNode) {
  if (node.tagName === "img") {
    const u = fixUrl(url);
    if (isYouTube({ url: u.href })) {
      return handleYouTubeVideo(u, node);
    }
    return handleImg(url, node);
  }
}

function handleYouTubeVideo(url: URL, node: HastNode) {
  const src = `https://www.youtube-nocookie.com/embed/${extractYouTubeId(url)}`;
  node.tagName = "iframe";
  node.properties = {
    width: determineWidth(url).toString(),
    height: determineHeight(url).toString(),
    frameborder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen: true,
    src,
    title: node.properties.title ?? node.properties.alt,
  };
  return src;
}

function extractYouTubeId(url: URL) {
  if (url.host === "youtu.be") {
    return url.pathname.replace("/", "");
  }
  if (["www.youtube.com", "youtube.com"].includes(url.host)) {
    return url.searchParams?.get("v");
  }
}

function handleImg(url: URL, node: HastNode) {
  const sizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
  const img = node as HastImageNode;
  img.properties.decode = "async";
  const w = determineWidth(url, sizes);
  const q = determineQuality(url);
  img.properties.sizes = sizes.reduce(
    (value, size) =>
      size <= w ? `(max-width: ${size}px) ${size}px, ${value} `.trim() : value,
    `${w}px`
  );
  img.properties.srcSet = sizes.reduce(
    (value, size) =>
      size <= w
        ? `/_next/image?url=${encodeURIComponent(
            url.href
          )}&w=${size}&q=${q} ${size}px, ${value}`.trim()
        : value,
    ``
  );
  img.properties.width = w.toString();
  img.properties.height = determineHeight(url).toString();
  return `/_next/image?url=${encodeURIComponent(
    url.href.replace(url.search, "")
  )}&w=${w}&q=${q}`;
}

function determineWidth(url: URL, sizes?: number[]) {
  if (!sizes) return 640;
  sizes = sizes.sort((a, b) => a - b);
  let w = url.searchParams?.has("w") ? Number(url.searchParams.get("w")) : 640;
  if (sizes?.length && !sizes.includes(w)) {
    w = w < sizes[0] ? sizes[0] : sizes.filter((s) => s < w).pop();
  }
  return w;
}

function determineHeight(url: URL) {
  return url.searchParams?.has("h") ? Number(url.searchParams.get("h")) : 360;
}

function determineQuality(url: URL) {
  let q = url.searchParams?.has("q") ? Number(url.searchParams.get("q")) : 75;
  q = q > 100 ? 100 : q;
  return q;
}

function fixUrl(url: URL) {
  let u = url;
  if (u.protocol == null) {
    u = new URL(`http://fake.host/${url.href}`);
  }
  return new URL(u.href);
}

// lovingly borrowed from:
// https://github.com/MichaelDeBoey/gatsby-remark-embedder/tree/master/src/transformers
function isYouTube({ url }) {
  const { host, pathname, searchParams } = new URL(url);

  return (
    host === "youtu.be" ||
    (["youtube.com", "www.youtube.com"].includes(host) &&
      pathname.includes("/watch") &&
      Boolean(searchParams.get("v")))
  );
}

// function isTwitter({ url }) {
//   let { host, pathname } = new URL(url);
//
//   return (
//     ["twitter.com", "www.twitter.com"].includes(host) &&
//     (pathname.includes("/status/") ||
//       (["/events/", "/moments/", "/timelines/"].some((item) =>
//         pathname.includes(item)
//       ) &&
//         !pathname.includes("/edit/")))
//   );
// }
