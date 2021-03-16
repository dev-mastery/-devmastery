import { Image, URI } from "../../common/entities";

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

export function handleMedia(url: URL, node: HastNode): string | void {
  if (node.tagName === "img") {
    const u = url.href;
    const image = Image.from({ uri: URI.of(u) });
    const youTubeId = extractyouTubeId(url);
    if (youTubeId) {
      return handleYouTubeVideo({
        height: image.height,
        width: image.width,
        node,
        youTubeId,
      });
    }
    return handleImg({ image, node });
  }
}

function handleImg({ image, node }: { image: Image; node: HastNode }) {
  const sizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
  const imgNode = node as HastImageNode;
  imgNode.properties.decode = "async";

  const w = image.width;
  const q = image.quality;
  imgNode.properties.sizes = sizes.reduce(
    (value, size) =>
      size <= w ? `(max-width: ${size}px) ${size}px, ${value} `.trim() : value,
    `${w}px`
  );
  imgNode.properties.srcSet = sizes.reduce(
    (value, size) =>
      size <= w
        ? `/_next/image?url=${encodeURIComponent(
            image.src
          )}&w=${size}&q=${q} ${size}px, ${value}`.trim()
        : value,
    ``
  );
  imgNode.properties.width = w.toString();
  imgNode.properties.height = image.height.toString();
  return `/_next/image?url=${encodeURIComponent(image.src)}&w=${w}&q=${q}`;
}

function handleYouTubeVideo({
  width,
  height,
  node,
  youTubeId,
}: {
  width: number;
  height: number;
  node: HastNode;
  youTubeId: string;
}) {
  const src = `https://www.youtube-nocookie.com/embed/${youTubeId}`;
  node.tagName = "iframe";
  node.properties = {
    width: width.toString(),
    height: height.toString(),
    frameborder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen: true,
    sandbox: true,
    seamless: true,
    src,
    title: node.properties.title ?? node.properties.alt,
  };
  return src;
}

function extractyouTubeId(url: URL): string | null {
  if (url.host === "youtu.be") {
    return url.pathname.replace("/", "");
  }
  if (["www.youtube.com", "youtube.com"].includes(url.host)) {
    return url.searchParams?.get("v");
  }
  return null;
}
