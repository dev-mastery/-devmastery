import { OperationalError } from "@devmastery/error";
import { Validation } from "./Validation";
import { NonEmptyString } from "./NonEmptyString";
import { Slug } from "./Slug";

const ID_SEPARATOR = ":";

export class ContentId extends NonEmptyString.named("ContentId").BaseClass {
  public static from({
    slug,
    locale,
  }: {
    slug: Slug;
    locale: Locale;
  }): ContentId {
    return ContentId.of(`${slug.toString()}${ID_SEPARATOR}${locale}`);
  }

  public static of(id: string): ContentId {
    ContentId.validate(id).throwIfNotValid();
    return new ContentId(id);
  }

  public static get separator(): string {
    return ID_SEPARATOR;
  }

  public static isValid(value: string): boolean {
    const [slug, locale] = value.split(ContentId.separator);
    return (
      value.includes(ContentId.separator) &&
      Slug.isValid(slug) &&
      super.isValid(locale)
    );
  }

  protected static validate(value: string): Validation {
    const baseValidation = super.validate(value);
    if (baseValidation.isNotValid()) {
      return baseValidation;
    }

    if (!value.includes(ContentId.separator)) {
      return Validation.failed(new ContentIdSeparatorError());
    }

    const [slug, locale] = value.split(ContentId.separator);
    if (!Slug.isValid(slug)) {
      return Validation.failed(new ContentIdSlugError());
    }
    return super.validate(locale);
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
