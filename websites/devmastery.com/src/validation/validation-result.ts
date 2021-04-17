import { ValidationError } from ".";

export type ValidationFn = <TValue>(value: TValue) => ValidationResult;
export type ValidationResult = Readonly<{
  error: Error | null;
  throwIfNotValid(): void;
  isValid(): boolean;
  isNotValid(): boolean;
}>;

const makeValidationResult = (
  error: ValidationError.ValidationError | null
): ValidationResult => {
  return Object.freeze({
    error,
    isNotValid: () => Boolean(error),
    isValid: () => !error,
    throwIfNotValid: () => {
      if (error) throw error;
    },
  });
};

export const valid = (): ValidationResult => makeValidationResult(null);

export const notValid = (
  error: ValidationError.ValidationError
): ValidationResult => makeValidationResult(error);
