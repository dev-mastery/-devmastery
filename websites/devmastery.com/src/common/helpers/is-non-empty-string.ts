import { OperationalError } from "@devmastery/error";

export const validateNonEmptyString = (name: string) => (
  value: unknown
): void => {
  if (value == null) {
    throw new NullValueError(name);
  }

  if (typeof value !== "string") {
    throw new NotAStringError(name);
  }

  if (!value?.trim().length) {
    throw new EmptyStringError(name);
  }
};

export class NotAStringError extends OperationalError {
  public constructor(name: string, context?: string) {
    super({
      mergeFields: { fieldName: name },
      message: `${name} must be a string.`,
      context: getContext(name, context),
    });
  }
}

export class EmptyStringError extends OperationalError {
  public constructor(name: string, context?: string) {
    super({
      mergeFields: { fieldName: name },
      message: `${name} cannot be empty.`,
      context: getContext(name, context),
    });
  }
}

export class NullValueError extends OperationalError {
  public constructor(name: string, context?: string) {
    super({
      mergeFields: { fieldName: name },
      message: `${name} cannot be null.`,
      context: getContext(name, context),
    });
  }
}

function getContext(name: string, context?: string) {
  return context ?? `Attempting to create a "${name}".`;
}
