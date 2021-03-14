import {
  isValidNonEmptyString,
  validateNonEmptyString,
} from "./non-empty-string";
import { SlugFactory } from "./slug-factory";

export interface ContentId {
  toString(): string;
  equals(other: ContentId): boolean;
}

interface ContentIdProps {
  slug: SlugFactory;
  locale: Locale;
}

const label = "Content Id";
export const validateContentId = validateNonEmptyString.bind(null, label);
export const isValidContentId = isValidNonEmptyString;

export function contentIdFrom({ slug, locale }: ContentIdProps): ContentId {
  return contentIdOf(`${slug.toString()}:${locale}`);
}

export function contentIdOf(value: string) {
  const id = value.trim();
  validateContentId(id);
  return Object.freeze({
    toString: () => id,
    equals: (other: ContentId) => other.toString() === id,
  });
}
