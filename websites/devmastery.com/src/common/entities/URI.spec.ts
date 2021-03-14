import { OperationalError } from "@devmastery/error";
import * as faker from "faker";
import { MaxLengthError } from "./NonEmptyString";
import { URI } from "./URI";

const valid = [
  "/a/b/c",
  "/aaa",
  "/aa?b=bb&c=d",
  "https://google.com",
  "http://www.abc.com",
];
const invalid = ["", null];

describe("URI", () => {
  it("Tests URIs", () => {
    expect.assertions(valid.length + invalid.length);
    valid.forEach((uri) => expect(URI.isValid(uri)).toBe(true));
    invalid.forEach((uri) =>
      expect(URI.isValid((uri as unknown) as string)).toBe(false)
    );
  });

  it("Accepts valid URIs", () => {
    expect.assertions(valid.length);
    valid.forEach((uri) => expect(URI.of(uri).toString()).toBe(uri));
  });

  it("Rejects invalid URIs", () => {
    expect.assertions(invalid.length);
    invalid.forEach((uri) =>
      expect(() => URI.of((uri as unknown) as string)).toThrow(OperationalError)
    );
  });

  it("Exposes the URI format.", () => {
    expect(URI.of(valid[0]).format).toBe(URI.format);
  });

  it("Enforces max length of 2000", () => {
    const max = 2000;
    const http = faker.internet.url() + "/";
    const longUri =
      http +
      Array(max - http.length)
        .fill(0)
        .join("");
    const uri = URI.of(longUri);
    expect(uri.length).toBe(max);
    expect(URI.maxLength).toBe(uri.length);

    const badUri = longUri + "x";
    expect(() => URI.of(badUri)).toThrow(MaxLengthError);
  });
});
