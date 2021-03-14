import { MaxLengthError } from "../../common/entities/NonEmptyString";
import { Summary } from "./Summary";
import faker from "faker";

describe("Summary", () => {
  it("Cleans up a partial word at the end", () => {
    const lastWord = faker.lorem.word(10);
    const textArray = Array(46)
      .fill(0)
      .map(() => "lorem");
    textArray.push(lastWord);
    const text = textArray.join(" ");
    const summary = Summary.from(text);
    expect(summary.length).toBeLessThanOrEqual(summary.maxLength);
    expect(summary.toString().includes(lastWord)).toBe(false);
  });

  it("Generates a summary for long text", () => {
    const text = faker.lorem.words(280);
    const summary = Summary.from(text);
    expect(summary.length).toBeLessThanOrEqual(summary.maxLength);
  });

  it("Rejects overlong summaries", () => {
    const text = faker.lorem.words(280);
    expect(() => Summary.of(text)).toThrow(MaxLengthError);
  });

  it("Has a max length.", () => {
    expect(Summary.of("abc").maxLength).toBe(Summary.maxLength);
  });
});
