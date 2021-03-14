import { Validation } from "./Validation";

describe("Validation.", () => {
  it("Can pass.", () => {
    const result = Validation.passed();
    expect(result.isValid()).toBe(true);
    expect(result.isNotValid()).toBe(false);
    expect(result.error).toBeUndefined();
    expect(() => result.throwIfNotValid()).not.toThrow();
  });

  it("Can fail.", () => {
    const error = new TypeError("boom!");
    const result = Validation.failed(error);
    expect(result.isValid()).toBe(false);
    expect(result.isNotValid()).toBe(true);
    expect(result.error).toEqual(error);
    expect(() => result.throwIfNotValid()).toThrow(error);
  });
});
