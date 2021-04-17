import { validateNonEmptyString } from "../helpers/is-non-empty-string";
import {
  makeValueObjectType,
  ValueObject,
  ValueObjectType,
} from "../value-objects/value-object-type";

export type NonEmptyStringType<TName extends string> = ValueObjectType<
  TName,
  string
>;

export type NonEmptyString<TName extends string> = ValueObject<TName, string>;

export const makeNonEmptyStringType = <TName extends string>(
  type: TName
): NonEmptyStringType<TName> =>
  makeValueObjectType<TName, string>({
    type,
    validate: validateNonEmptyString(type),
  });

type Cat = NonEmptyString<"Cat">;
const Cat = makeNonEmptyStringType<"Cat">("Cat");
const l: Cat = Cat.of("Luna");

function meow(c: Cat) {}
