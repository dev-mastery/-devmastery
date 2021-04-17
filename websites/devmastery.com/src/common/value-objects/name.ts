import { validateNonEmptyString } from "../helpers/is-non-empty-string";
import { StringValue } from "./value-object-type";

const TAG = "Name" as const;
export type Name = StringValue<typeof TAG>;

export const Name = Object.freeze({
  of(value: string): Name {
    validateNonEmptyString("Name")(value);
    return lift(value.trim());
  },
});

const lift = (value: string): Name =>
  Object.freeze(
    Object.assign(String(value), {
      _tag: "Name" as const,
      toJSON: () => value,
      equals: (other: Name) => other.valueOf() === value,
    })
  );
