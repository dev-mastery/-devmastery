import { interpolate } from "./interpolate";

interface MergeFields {
  [key: string]: string | number;
}

describe("interpolate", () => {
  it("replaces values", () => {
    const mergeFields = {
      name: "Mohamed",
    };
    const text = "Hello, {{name}}!";
    const expected = `Hello, ${mergeFields.name}!`;
    expect(interpolate({ text, mergeFields })).toBe(expected);
  });
  it("ignores extraneous mergeFields", () => {
    const mergeFields = {
      extraneous: "foo",
    };
    const text = "Hello!";
    const expected = `Hello!`;
    expect(interpolate({ text, mergeFields })).toBe(expected);
  });
  it("errors on missing mergeFields", () => {
    const mergeFields = null;
    const text = "Hello!";
    expect(() =>
      interpolate({
        text,
        mergeFields: (mergeFields as unknown) as MergeFields,
      })
    ).toThrow(TypeError);
  });
  it("errors on missing text", () => {
    const mergeFields = {
      extraneous: "foo",
    };
    const text = null;
    expect(() =>
      interpolate({ text: (text as unknown) as string, mergeFields })
    ).toThrow(TypeError);
  });
});
