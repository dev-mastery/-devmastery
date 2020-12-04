export function pipe(...fns: Function[]) {
  return (param?: any) =>
    fns.reduce(
      (result, fn) => (result?.then && result.then(fn)) || fn(result),
      param
    );
}

export function isHttpUrl({ url }: { url: string }) {
  const urlRe = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;
  return urlRe.test(url);
}

// lovingly borrowed from:
// https://github.com/MichaelDeBoey/gatsby-remark-embedder/tree/master/src/transformers
export function isYouTube({ url }) {
  let { host, pathname, searchParams } = new URL(url);

  return (
    host === "youtu.be" ||
    (["youtube.com", "www.youtube.com"].includes(host) &&
      pathname.includes("/watch") &&
      Boolean(searchParams.get("v")))
  );
}

export function isTwitter({ url }) {
  let { host, pathname } = new URL(url);

  return (
    ["twitter.com", "www.twitter.com"].includes(host) &&
    (pathname.includes("/status/") ||
      (["/events/", "/moments/", "/timelines/"].some((item) =>
        pathname.includes(item)
      ) &&
        !pathname.includes("/edit/")))
  );
}
