import { OperationalError } from '@devmastery/error';

import { Validation } from './Validation';

export interface NonEmptyStringValue extends String {
  readonly format: RegExp;
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
    const trimmed = name.trim();
    if (!trimmed.length) {
      throw new UnnamedStringError();
    }
    this.#name = trimmed;
  }

  public static of(value: string, name: string): NonEmptyStringValue {
    return NonEmptyString.named(name).BaseClass.of(value);
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
      protected constructor(value: string) {
        super(value?.trim());
        NonEmptyStringValue.validate(value).throwIfNotValid();
      }

      public static of(value: string) {
        return new NonEmptyStringValue(value);
      }

      public static isValid(value: string): boolean {
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

      protected static validate(value: string): Validation {
        const trimmed = value?.trim();
        if (trimmed == null) {
          return Validation.failed(new NullValueError(outer.#name));
        }
        if (!trimmed.length) {
          return Validation.failed(new EmptyStringError(outer.#name));
        }
        if (trimmed.length < outer.#minLength) {
          return Validation.failed(
            new MinLengthError(outer.#name, outer.#minLength)
          );
        }
        if (trimmed.length > outer.#maxLength) {
          return Validation.failed(
            new MaxLengthError(outer.#name, outer.#maxLength)
          );
        }
        if (!outer.#format.test(trimmed)) {
          return Validation.failed(
            new MalformedError(outer.#name, outer.#format)
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

export class EmptyStringError extends OperationalError {
  public constructor(name: string) {
    super({
      mergeFields: { fieldName: name },
      message: `${name} cannot be empty.`,
      context: `Attempting to create a "${name}".`,
    });
  }
}

export class NullValueError extends OperationalError {
  public constructor(name: string) {
    super({
      mergeFields: { fieldName: name },
      message: `${name} cannot be null.`,
      context: `Attempting to create a "${name}".`,
    });
  }
}

export class MinLengthError extends OperationalError {
  public constructor(name: string, minLength: number) {
    super({
      mergeFields: { fieldName: name, minLength },
      message: `${name} must be at least ${minLength} characters long.`,
      context: `Attempting to create a "${name}".`,
    });
  }
}

export class MaxLengthError extends OperationalError {
  public constructor(name: string, maxLength: number) {
    super({
      mergeFields: { fieldName: name, maxLength },
      message: `${name} cannot exceed ${maxLength} characters.`,
      context: `Attempting to create a "${name}".`,
    });
  }
}

export class MalformedError extends OperationalError {
  public constructor(name: string, format: RegExp) {
    super({
      mergeFields: { fieldName: name, format },
      message: `${name} must obey format: "${format.toString()}".`,
      context: `Attempting to create a "${name}".`,
    });
  }
}
