export class ValidationResult {
  #error: Error | undefined;
  private constructor(error?: Error) {
    this.#error = error;
  }

  public static valid(): ValidationResult {
    return new ValidationResult();
  }

  public static notValid(error: Error): ValidationResult {
    return new ValidationResult(error);
  }

  public throwIfNotValid(): void {
    if (this.error) {
      throw this.error;
    }
  }

  public get error(): Error | undefined {
    return this.#error;
  }

  public isValid(): boolean {
    return !this.#error;
  }

  public isNotValid(): boolean {
    return !this.isValid;
  }
}
