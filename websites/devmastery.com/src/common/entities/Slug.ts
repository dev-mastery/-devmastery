import { NonEmptyString } from "./NonEmptyString";

const SLUG_FORMAT = /^\w+(?:-\w+)*$/;
const MAX_LENGTH = 1200;

export class Slug extends NonEmptyString.named("Slug")
  .maxLength(MAX_LENGTH)
  .format(SLUG_FORMAT).BaseClass {
  public static from(text: string): Slug {
    if (Slug.isValid(text)) {
      return Slug.of(text);
    }

    const value: string = text
      .trim()
      .replace(/[^\w-]/g, "-")
      .split("-")
      .filter((s) => Boolean(s.length))
      .join("-")
      .toLowerCase();

    return Slug.of(value);
  }

  public static get maxLength(): number {
    return MAX_LENGTH;
  }

  public static get format(): RegExp {
    return SLUG_FORMAT;
  }
}
