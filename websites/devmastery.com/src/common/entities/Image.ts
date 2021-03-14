import { Caption } from "./Caption";
import { URI } from "./URI";

export class Image {
  readonly #src: string;
  readonly #quality: number;
  readonly #width: number;
  readonly #height: number;
  readonly #alt: string | undefined;

  private constructor({ src, quality, width, height, alt }: ImageProps) {
    this.#src = src.toString();
    this.#quality = quality;
    this.#width = width;
    this.#height = height;
    this.#alt = alt?.toString();
  }

  public static of(props: ImageProps): Image {
    return new Image(props);
  }

  public static from({ uri, caption }: { uri: URI; caption: Caption }): Image {
    const uriString = uri.toString();
    const url = uriString.startsWith("http")
      ? new URL(uriString)
      : new URL(`http://fake.url/${uriString}`);

    let quality =
      url.searchParams.get("q") ?? url.searchParams.get("quality") ?? 75;
    quality = Math.round(Math.abs(Number(quality)));

    let width =
      url.searchParams.get("w") ?? url.searchParams.get("width") ?? 640;
    width = Math.round(Math.abs(Number(width)));

    let height =
      url.searchParams.get("h") ?? url.searchParams.get("height") ?? 480;
    height = Math.round(Math.abs(Number(height)));

    const src = URI.of(uriString.split("?")[0]);

    return Image.of({ src, height, width, quality, alt: caption });
  }

  public toPlainObject(): Readonly<PlainImage> {
    return Object.freeze({
      src: this.src,
      height: this.height,
      width: this.width,
      quality: this.quality,
      alt: this.alt,
    });
  }

  public get src(): string {
    return this.#src;
  }

  public get quality(): number {
    return this.#quality;
  }

  public get width(): number {
    return this.#width;
  }

  public get height(): number {
    return this.#height;
  }

  public get alt(): string | undefined {
    return this.#alt;
  }
}

interface ImageProps {
  src: URI;
  quality: number;
  width: number;
  height: number;
  alt?: Caption;
}

export interface PlainImage {
  src: string;
  height: number;
  width: number;
  quality: number;
  alt?: string;
}
