import { NonEmptyString } from "./non-empty-string";

const urlFormat = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

export type Image = ReturnType<typeof imageFrom>;
export function imageFrom(uri: NonEmptyString, caption?: NonEmptyString) {
  let url = urlFormat.test(uri.toString())
    ? new URL(uri.toString())
    : new URL(`http://fake.url/${uri}`);

  return Object.freeze({
    height:
      url.searchParams.has("h") || url.searchParams.has("height")
        ? Number(url.searchParams?.get("h") ?? url.searchParams?.get("height"))
        : null,
    quality: url.searchParams.has("q")
      ? Number(url.searchParams?.get("q"))
      : null,
    src: uri.toString(),
    width:
      url.searchParams.has("w") || url.searchParams.has("width")
        ? Number(url.searchParams?.get("w") ?? url.searchParams?.get("width"))
        : null,
    caption: caption?.toString() ?? null,
  });
}
