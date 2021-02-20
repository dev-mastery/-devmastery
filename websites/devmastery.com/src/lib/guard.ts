export function mustBeGreaterThanZero({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  if (value < 1) {
    throw new NotGreaterThanZeroError(`${label} must be greater than 0`);
  }
  return value;
}

export function mustBeAWholeNumber(label: string, value: number) {
  if (value % 1 !== 0) {
    throw new NotAWholeNumberError(`${label} must be a whole number.`);
  }
  return value;
}

export function mustNotBeNull(label: string, value: any) {
  if (value == null) {
    throw new NullReferenceError(`${label} cannot be null`);
  }
  return value;
}

export function mustNotBeEmpty(label: string, value: string | any[]) {
  if (Boolean(!value.length)) {
    throw new EmptyValueError(`${label} cannot be empty.`);
  }
  return value;
}

export function mustNotBeNullOrEmpty(label: string, value: any[] | string) {
  mustNotBeNull(label, value);
  mustNotBeEmpty(label, value);
  return value;
}

export function mustHaveLengthBetween(
  min: number,
  max: number,
  label: string,
  value: string | any[]
) {
  return (
    mustBeAtLeastAsLongAs(min, label, value) &&
    mustBeNoLongerThan(max, label, value)
  );
}

export function mustBeAtLeastAsLongAs(
  min: number,
  label: string,
  value: string | any[]
) {
  let msg =
    typeof value == "string"
      ? `${label} must be at least ${min} character(s) long.`
      : `${label} must contain at least ${min} items.`;

  if (value?.length <= min) {
    throw new TooShortError(msg);
  }
  return value;
}

export function mustBeLongerThan(
  length: number,
  label: string,
  value: string | any[]
) {
  return mustBeAtLeastAsLongAs(length + 1, label, value);
}

export function mustBeNoLongerThan(
  max: number,
  label: string,
  value: string | any[]
) {
  let msg =
    typeof value == "string"
      ? `${label} cannot be longer than ${max} character(s).`
      : `${label} cannot have more than ${max} item(s).`;

  if (value?.length > max) {
    throw new TooLongError(msg);
  }
  return value;
}

export function mustBeShorterThan(
  length: number,
  label: string,
  value: string | any[]
) {
  return mustBeNoLongerThan(length - 1, label, value);
}

export function mustHaveFormat({
  description,
  expression,
  label,
  value,
}: {
  description: string;
  expression: RegExp;
  label: string;
  value: string;
}) {
  if (!expression?.test(value)) {
    throw new TypeError(`${label} ${description}`);
  }
}

class NotGreaterThanZeroError extends RangeError {}
class TooShortError extends RangeError {}
class TooLongError extends RangeError {}
class NotAWholeNumberError extends TypeError {}
class MalformedError extends TypeError {}
class NullReferenceError extends TypeError {}
class EmptyValueError extends TypeError {}
