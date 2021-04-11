import { OperationalError } from "@devmastery/error";
import { Validation, ValidationResult } from "./Validation";

export interface NonEmptyStringValue {
  readonly format: RegExp;
  readonly length: number;
  readonly minLength: number;
  readonly maxLength: number;
  equals(other: NonEmptyStringValue): boolean;
}

export class NonEmptyString {
  readonly #name: string;
  #minLength = 1;
  #maxLength: number = Number.MAX_SAFE_INTEGER;
  #format = new RegExp("");

  private constructor(name: string) {
    const trimmed = name?.trim();
    if (!trimmed?.length) {
      throw new UnnamedStringError();
    }
    this.#name = trimmed;
  }

  public static of(name: string, value: string): NonEmptyStringValue {
    return NonEmptyString.named(name).BaseClass.of(value);
  }

  public static validate(value: unknown, name: string): Validation {
    return NonEmptyString.named(name).BaseClass.validate(value);
  }

  public static named(name: string): NonEmptyString {
    return new NonEmptyString(name);
  }

  public minLength(value: number): NonEmptyString {
    this.#minLength = value;
    return this;
  }

  public maxLength(value: number): NonEmptyString {
    this.#maxLength = value;
    return this;
  }

  public format(value: RegExp): NonEmptyString {
    this.#format = value;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public get BaseClass() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const outer = this;
    return class NonEmptyStringValue extends String {
      private __fromConstructor: never;
      protected constructor(value: string) {
        super(value);
      }

      public static of(value: string) {
        NonEmptyStringValue.validate(value).throwIfNotValid();
        return new NonEmptyStringValue(value);
      }

      public static from(value: string) {
        return this.of(value.trim());
      }

      public static isValid(value: unknown): boolean {
        return NonEmptyStringValue.validate(value).isValid();
      }

      public get minLength(): number {
        return outer.#minLength;
      }

      public get maxLength(): number {
        return outer.#maxLength;
      }

      public get format(): RegExp {
        return outer.#format;
      }

      public static validate(
        value: unknown,
        context?: string
      ): ValidationResult {
        if (value == null) {
          return Validation.failed(new NullValueError(outer.#name, context));
        }
        if (typeof value !== "string") {
          return Validation.failed(new NotAStringError(outer.#name, context));
        }

        const trimmed = value.trim();
        if (!trimmed.length) {
          return Validation.failed(new EmptyStringError(outer.#name, context));
        }

        if (trimmed.length < outer.#minLength) {
          return Validation.failed(
            new MinLengthError(outer.#name, outer.#minLength, context)
          );
        }

        if (trimmed.length > outer.#maxLength) {
          return Validation.failed(
            new MaxLengthError(outer.#name, outer.#maxLength, context)
          );
        }

        if (!outer.#format.test(trimmed)) {
          return Validation.failed(
            new MalformedError(outer.#name, outer.#format, context)
          );
        }

        return Validation.passed();
      }

      public equals(other: NonEmptyStringValue): boolean {
        return this.valueOf() === other.valueOf();
      }
    };
  }
}

export class UnnamedStringError extends OperationalError {
  public constructor() {
    super({
      message: `Non-empty strings must be named.`,
      context: `Attempting to create a NonEmptyString base class.`,
    });
  }
}

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

export class MinLengthError extends OperationalError {
  public constructor(name: string, minLength: number, context?: string) {
    super({
      mergeFields: { fieldName: name, minLength },
      message: `${name} must be at least ${minLength} characters long.`,
      context: getContext(name, context),
    });
  }
}

export class MaxLengthError extends OperationalError {
  public constructor(name: string, maxLength: number, context?: string) {
    super({
      mergeFields: { fieldName: name, maxLength },
      message: `${name} cannot exceed ${maxLength} characters.`,
      context: getContext(name, context),
    });
  }
}

export class MalformedError extends OperationalError {
  public constructor(name: string, format: RegExp, context?: string) {
    super({
      mergeFields: { fieldName: name, format },
      message: `${name} must obey format: "${format.toString()}".`,
      context: getContext(name, context),
    });
  }
}

function getContext(name: string, context?: string) {
  return context ?? `Attempting to create a "${name}".`;
}
