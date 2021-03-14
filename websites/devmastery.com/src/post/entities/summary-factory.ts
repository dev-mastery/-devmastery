import {
  isValidNonEmptyString,
  validateNonEmptyString,
} from "../../common/entities";

export interface SummaryFactory {
  toString(): string;
  equals(other: SummaryFactory): boolean;
}

const max = 280;
export function summaryFrom(
  text: string,
  maxLength: number = max
): SummaryFactory {
  validateNonEmptyString("PostFactory SummaryFactory", text);
  let trimmed = text.trim();
  if (trimmed.length > maxLength) {
    const words = trimmed.substring(0, maxLength).split(" ");
    trimmed = words.slice(0, words.length - 2).join(" ") + "...";
  }
  return {
    toString: () => trimmed,
    equals: (other: SummaryFactory) => other.toString() === trimmed,
  };
}

export function isValidSummary(text: string, maxLength: number = max): boolean {
  return isValidNonEmptyString(text) && text.length <= maxLength;
}

export function validateSummary(text: string, maxLength: number = max) {
  validateNonEmptyString("PostFactory SummaryFactory", text);
  if (text.length > maxLength) {
    throw new RangeError(
      `Post Summary must be less than ${maxLength} characters.`
    );
  }
}
