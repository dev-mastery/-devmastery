import { OperationalError } from "@devmastery/error";
import { ContentId } from "./ContentId";
import { NonEmptyString } from "./NonEmptyString";
import { Slug } from "./Slug";

describe("ContentId", () => {
  it("creates a content Id from a slug and a locale", () => {
    const slug = Slug.of("slug");
    const locale = "en";
    const expected = `${slug.toString()}${ContentId.separator}${locale}`;
    const id = ContentId.from({ slug, locale });
    expect(id.toString()).toBe(expected);
  });

  it("checks Content Id validity", () => {
    const slug = Slug.of("slug");
    const locale = "en";
    const valid = ContentId.from({ slug, locale });
    const missingSlug = `${ContentId.separator}${locale}`;
    const missingSeparator = `${slug}${locale}`;
    const missingLocale = `slug${ContentId.separator}`;
    const notValid = [missingLocale, missingSeparator, missingSlug];
    expect.assertions(notValid.length + 1);
    expect(ContentId.isValid(valid.toString())).toBe(true);
    notValid.forEach((id) => expect(ContentId.isValid(id)).toBe(false));
  });

  it("rejects invalid Content Ids", () => {
    const slug = Slug.of("slug");
    const locale = "en";
    const missingSlug = `${ContentId.separator}${locale}`;
    const missingSeparator = `${slug}${locale}`;
    const missingLocale = `slug${ContentId.separator}`;
    const notValid = [missingLocale, missingSeparator, missingSlug];
    expect.assertions(notValid.length);
    notValid.forEach((id) =>
      expect(() => ContentId.of(NonEmptyString.of("ContentId", id))).toThrow(
        OperationalError
      )
    );
  });

  it("accepts invalid Content Ids", () => {
    const slug = Slug.of("slug");
    const locale = "en";
    const id = ContentId.from({ slug, locale });
    expect(
      ContentId.of(NonEmptyString.of("ContentId", id.toString())).equals(id)
    ).toBe(true);
  });
});
