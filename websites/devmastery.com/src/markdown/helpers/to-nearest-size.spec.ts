import { toNearestSize } from "./to-nearest-size";

describe("to nearest size", () => {
  it("expands to min size", () => {
    const sizes = [100, 200];
    expect(toNearestSize(sizes, 50)).toBe(100);
  });
  it("contracts to max size", () => {
    const sizes = [100, 200];
    expect(toNearestSize(sizes, 250)).toBe(200);
  });
  it("expands to nearest size without shrinking", () => {
    const sizes = [100, 200];
    expect(toNearestSize(sizes, 105)).toBe(200);
  });
});
