import {
  isValidNonEmptyString,
  validateNonEmptyString,
} from "./non-empty-string";
import { Slug } from "./slug";

export interface ContentId {
  toString(): string;
  equals(other: ContentId): boolean;
}

interface ContentIdProps {
  slug: Slug;
  locale: Locale;
}

const label = "Content Id";
export const validateContentId = validateNonEmptyString.bind(null, label);
export const isValidContentId = isValidNonEmptyString;

export function contentIdFrom({ slug, locale }: ContentIdProps): ContentId {
  return contentIdOf(`${slug.toString()}:${locale}`);
}

export function contentIdOf(value: string) {
  let id = value.trim();
  validateContentId(id);
  return Object.freeze({
    toString: () => id,
    equals: (other: ContentId) => other.toString() === id,
  });
}
