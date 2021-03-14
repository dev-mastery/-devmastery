import { MalformedError } from "./NonEmptyString";
import { Slug } from "./Slug";

describe("Slug", () => {
  it("makes slugs", () => {
    expect(Slug.of("a-slug").toString()).toBe("a-slug");
  });

  it("makes a slug from text", () => {
    const helloWorld = Slug.from("@Hello world!!");
    const hello = Slug.from("Hello!");
    const slug = Slug.from("i-am-a-slug");
    expect(helloWorld.toString()).toBe("hello-world");
    expect(hello.toString()).toBe("hello");
    expect(slug.toString()).toBe("i-am-a-slug");
  });

  it("checks slug validity", () => {
    const valid = "i-am-a-slug";
    const notValid = "Not a slug";
    expect(Slug.isValid(valid)).toBe(true);
    expect(Slug.isValid(notValid)).toBe(false);
  });

  it("rejects invalid slugs", () => {
    const notASlug = "Not a slug";
    expect(() => Slug.of(notASlug)).toThrow(MalformedError);
  });
});
