export const isError = (value: unknown): value is Error =>
  value instanceof Error;

export const isNotError = (value: unknown): boolean => !isError(value);

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value == null;

export const isDefinedAndNotNull = (
  value: unknown
): value is NonNullable<unknown> => !isNullOrUndefined(value);

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isEmpty = (value: { length: number }): boolean => !value?.length;

export const isNotEmpty = (value: { length: number }): boolean =>
  Boolean(value.length);

export const isShorterThan = (length: number) => (value: {
  length: number;
}): boolean => value.length < length;

export const isLongerThan = (length: number) => (value: {
  length: number;
}): boolean => value.length > length;

export const isGreaterThan = (max: number) => (value: number): boolean =>
  value > max;

export const isLessThan = (min: number) => (value: number): boolean =>
  value < min;

export const isBetween = ([min, max]: [min: number, max: number]) => (
  value: number
): boolean => isGreaterThan(min)(value) && isLessThan(max)(value);

export const hasLengthBetween = ([min, max]: [
  min: number,
  max: number
]) => (value: { length: number }): boolean =>
  isBetween([min, max])(value.length);
