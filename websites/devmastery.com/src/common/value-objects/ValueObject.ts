export interface ValueObject<TName extends string, TValue> {
  type: TName;
  equals(other: ValueObject<TName, TValue>): boolean;
  valueOf(): TValue;
  toJSON(): TValue;
}

export interface ValueObjectType<TName extends string, TValue> {
  of(value: TValue): Readonly<ValueObject<TName, TValue>>;
}

export const makeValueObjectType = <TName extends string, TValue>({
  type,
  validate,
}: {
  type: TName;
  validate: (name: TName, value: unknown) => void;
}): ValueObjectType<TName, TValue> =>
  Object.freeze({
    of: (value: TValue): ValueObject<TName, TValue> => {
      validate(type, value);
      return Object.freeze({
        type,
        equals: (other: ValueObject<TName, TValue>) =>
          other.valueOf() === value,
        valueOf: () => value,
        toJSON: () => value,
      });
    },
  });
