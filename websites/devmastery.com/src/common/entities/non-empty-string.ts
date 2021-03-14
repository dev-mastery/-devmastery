import { OperationalError } from "@devmastery/error";

export interface NonEmptyString {
  equals(other: NonEmptyString): boolean;
  label: string;
  toString(): string;
}
export function nonEmptyString(label: string, value: string): NonEmptyString {
  let name = value?.trim();
  validateNonEmptyString(label, name);
  return Object.freeze({
    equals: (other: NonEmptyString) => name === other.toString(),
    label,
    toString: () => name,
  });
}

export function validateNonEmptyString(label: string, value: string) {
  if (value == null) {
    throw new NullStringError(label);
  }
  if (!Boolean(value.length)) {
    throw new EmptyStringError(label);
  }
}

export function isValidNonEmptyString(value: string): boolean {
  return value != null && Boolean(value.length);
}

class EmptyStringError extends OperationalError {
  constructor(label: string) {
    super({
      mergeFields: { fieldName: label },
      message: `${label} cannot be empty.`,
    });
  }
}

class NullStringError extends OperationalError {
  constructor(label: string) {
    super({
      mergeFields: { fieldName: label },
      message: `${label} cannot be null.`,
    });
  }
}
