import type {
  ValidationFn,
  ValidationResult,
} from "../../validation/validation-result";

export interface ValueObject<TName extends string, TValue> {
  __type: TName;
  equals(other: ValueObject<TName, TValue>): boolean;
  map<TOutput>(fn: (v: TValue) => TOutput): TOutput;
}

export interface ValueObjectType<TName extends string, TValue> {
  of(value: TValue): Readonly<ValueObject<TName, TValue>>;
  validate(value: unknown): ValidationResult;
  is(valueObject: ValueObject<TName, TValue>): boolean;
}

export const define = <TName extends string, TValue>({
  name,
  validator,
}: {
  name: TName;
  validator: ValidationFn;
}): ValueObjectType<TName, TValue> =>
  Object.freeze({
    of: (value: TValue): ValueObject<TName, TValue> => {
      validator(value).throwIfNotValid();
      return Object.freeze({
        __type: name,
        equals: (other: ValueObject<TName, TValue>) =>
          other.valueOf() === value,
        map: <TOutput>(fn: (v: TValue) => TOutput) => fn(value),
      });
    },
    validate: validator,
    is: (valueObject: ValueObject<TName, TValue>) =>
      valueObject.__type === name,
  });
