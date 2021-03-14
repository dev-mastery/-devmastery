import { interpolate } from "./interpolate";

describe("interpolate", () => {
  it("replaces values", () => {
    let mergeFields = {
      name: "Mohamed",
    };
    let text = "Hello, {{name}}!";
    let expected = `Hello, ${mergeFields.name}!`;
    expect(interpolate({ text, mergeFields })).toBe(expected);
  });
  it("ignores extraneous mergeFields", () => {
    let mergeFields = {
      extraneous: "foo",
    };
    let text = "Hello!";
    let expected = `Hello!`;
    expect(interpolate({ text, mergeFields })).toBe(expected);
  });
  it("errors on missing mergeFields", () => {
    let mergeFields = null;
    let text = "Hello!";
    expect(() => interpolate({ text, mergeFields })).toThrow(TypeError);
  });
  it("errors on missing text", () => {
    let mergeFields = {
      extraneous: "foo",
    };
    let text = null;
    expect(() => interpolate({ text, mergeFields })).toThrow(TypeError);
  });
});
