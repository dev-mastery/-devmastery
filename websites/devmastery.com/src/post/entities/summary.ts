import {
  isValidNonEmptyString,
  validateNonEmptyString,
} from "../../common/entities";

export interface Summary {
  toString(): string;
  equals(other: Summary): boolean;
}

const max = 280;
export function summaryFrom(text: string, maxLength: number = max): Summary {
  validateNonEmptyString("Post Summary", text);
  let trimmed = text.trim();
  if (trimmed.length > maxLength) {
    let words = trimmed.substring(0, maxLength).split(" ");
    trimmed = words.slice(0, words.length - 2).join(" ") + "...";
  }
  return {
    toString: () => trimmed,
    equals: (other: Summary) => other.toString() === trimmed,
  };
}

export function isValidSummary(text: string, maxLength: number = max): boolean {
  return isValidNonEmptyString(text) && text.length <= maxLength;
}

export function validateSummary(text: string, maxLength: number = max) {
  validateNonEmptyString("Post Summary", text);
  if (text.length > maxLength) {
    throw new RangeError(
      `Post Summary must be less than ${maxLength} characters.`
    );
  }
}
