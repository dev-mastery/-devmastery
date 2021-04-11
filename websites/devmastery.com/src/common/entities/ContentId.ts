import { OperationalError } from "@devmastery/error";
import { Validation } from "./Validation";
import { NonEmptyString, NonEmptyStringValue } from "./NonEmptyString";
import { Slug } from "./Slug";

const ID_SEPARATOR = ":";

export class ContentId {
  #value: NonEmptyStringValue;

  private constructor(value: NonEmptyStringValue) {
    this.#value = value;
  }

  public static from({
    slug,
    locale,
  }: {
    slug: Slug;
    locale: Locale;
  }): ContentId {
    return ContentId.of(
      NonEmptyString.of(
        "ContentId",
        `${slug.toString()}${ID_SEPARATOR}${locale}`
      )
    );
  }

  public static of(id: NonEmptyStringValue): ContentId {
    ContentId.validate(id).throwIfNotValid();
    return new ContentId(id);
  }

  public static get separator(): string {
    return ID_SEPARATOR;
  }

  public static isValid(value: unknown): boolean {
    return this.validate(value).isValid();
  }

  public static validate(value: unknown): Validation {
    NonEmptyString.validate(value, "ContentId");
    const asString = value as string;
    if (!asString.includes(ContentId.separator)) {
      return Validation.failed(new ContentIdSeparatorError());
    }

    const [slug, locale] = asString.split(ContentId.separator);
    if (!Slug.isValid(slug)) {
      return Validation.failed(new ContentIdSlugError());
    }

    if (!locale?.length) {
      return Validation.failed(new ContentIdLocaleError());
    }

    return Validation.passed();
  }

  public valueOf(): string {
    return this.#value.toString();
  }

  public toString(): string {
    return this.valueOf();
  }

  public equals(other: ContentId): boolean {
    return this.toString() === other.toString();
  }
}

export class ContentIdSlugError extends OperationalError {
  constructor() {
    super({
      context: "Making a Content Id",
      message: "Content Id must begin with a valid slug",
    });
  }
}

export class ContentIdLocaleError extends OperationalError {
  constructor() {
    super({
      context: "Making a Content Id",
      message: "Content Id must end with a valid locale",
    });
  }
}

export class ContentIdSeparatorError extends OperationalError {
  constructor() {
    super({
      context: "Making a Content Id",
      message: `Content Id must include a ${ContentId.separator} separator`,
      mergeFields: { separator: ContentId.separator },
    });
  }
}
