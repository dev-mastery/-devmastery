import { OperationalError } from "@devmastery/error";
import {
  isValidNonEmptyString,
  validateNonEmptyString,
} from "./non-empty-string";

export type Slug = {
  toString(): string;
  equals(other: Slug): boolean;
};
const label = "Slug";

export const slugFormat = /^\w+(?:-\w+)*$/;

export function slugOf(slug: string): Slug {
  validateSlug(slug);
  return Object.freeze({
    toString: () => slug,
    equals: (other: Slug) => other.toString() === slug,
  });
}

export function slugFrom(text: string) {
  let slug = isValidSlug(text)
    ? text
    : text
        ?.trim()
        .replace(/[^\w-]/g, "-")
        .split("-")
        .filter((s) => Boolean(s.length))
        .join("-")
        .toLowerCase();

  return slugOf(slug);
}

export function validateSlug(value: string) {
  validateNonEmptyString(label, value);
  if (isMalformedSlug(value)) {
    throw new MalformedSlugError();
  }
}

export function isValidSlug(value: string): boolean {
  return isValidNonEmptyString(value) && !isMalformedSlug(value);
}

function isMalformedSlug(value: string): boolean {
  return !slugFormat.test(value);
}

class MalformedSlugError extends OperationalError {
  constructor() {
    super({
      message:
        "Invalid slug. Slugs should be alphanumeric with dashes and no spaces.",
    });
  }
}
