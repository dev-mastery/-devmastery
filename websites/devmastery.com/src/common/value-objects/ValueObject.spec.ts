import * as ValueObjectType from "./value-object-type";
import type { ValueObject } from "./value-object-type";

describe("Value Objects", () => {
  xit("defines a value object type", () => {
    // const name = "FirstName";
    // const label = "First Name";
    // const { longEnough, definedAndNotNull, ofTypeString } = Validate;
    // const validator = Validate.all(
    //   definedAndNotNull(label),
    //   ofTypeString(label),
    //   longEnough(label)(2)
    // );
    // type FirstName = ValueObject<"FirstName", string>;
    // const FirstName = ValueObjectType.define<"FirstName", string>({
    //   name,
    //   validator,
    // });
    // const bill = "Bill";
    // const firstName: FirstName = FirstName.of(bill);
    // expect(firstName.__type).toBe("FirstName");
    // expect(firstName.map(String)).toBe(bill);
  });

  xit("validates values", () => {
    // const name = "FirstName";
    // const label = "First Name";
    // const minNameLength = 2;
    // const {
    //   longEnough,
    //   definedAndNotNull,
    //   ofTypeString,
    //   nonEmptyString,
    // } = Validate;
    // const validator = Validate.all(
    //   definedAndNotNull(label),
    //   nonEmptyString(label),
    //   ofTypeString(label),
    //   longEnough(label)(minNameLength)
    // );
    // const FirstName = ValueObjectType.define<"FirstName", string>({
    //   name,
    //   validator,
    // });
    // expect(FirstName.validate(null).throwIfNotValid).toThrow(
    //   nullOrUndefinedError({ label })
    // );
    // expect(() => FirstName.of((null as unknown) as string)).toThrow(
    //   nullOrUndefinedError({ label })
    // );
    // expect(() => FirstName.of("A")).toThrow(
    //   stringTooShortError({ label, minLength: minNameLength })
    // );
    // const bob = FirstName.of("Bob");
    // expect(FirstName.is(bob)).toBe(true);
  });
});
