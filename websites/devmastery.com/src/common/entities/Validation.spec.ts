import { Validation } from "./Validation";

describe("Validation Result.", () => {
  it("Can be valid.", () => {
    const result = Validation.passed();
    expect(result.isValid()).toBe(true);
    expect(result.isNotValid()).toBe(false);
    expect(result.error).toBeUndefined();
    expect(() => result.throwIfNotValid()).not.toThrow();
  });

  it("Can be invalid.", () => {
    const result = Validation.failed(new Error("boom!"));
  });
});
