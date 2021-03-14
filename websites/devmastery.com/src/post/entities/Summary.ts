import { NonEmptyString } from "../../common/entities";

const MAX_LENGTH = 280;

export class Summary extends NonEmptyString.named("Summary").maxLength(
  MAX_LENGTH
).BaseClass {
  public static from(text: string): Summary {
    let trimmed = text.trim();
    if (trimmed.length > MAX_LENGTH) {
      const words = trimmed.substring(0, MAX_LENGTH).split(" ");
      trimmed = words.slice(0, words.length - 1).join(" ") + "…";
    }
    return Summary.of(trimmed);
  }

  public static get maxLength(): number {
    return MAX_LENGTH;
  }
}
