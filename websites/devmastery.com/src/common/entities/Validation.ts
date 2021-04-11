export type ValidationResult = Validation;

export class Validation {
  #error: Error | undefined;
  private constructor(error?: Error) {
    this.#error = error;
  }

  public static passed(): Validation {
    return new Validation();
  }

  public static failed(error: Error): Validation {
    return new Validation(error);
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
    return !this.isValid();
  }
}
