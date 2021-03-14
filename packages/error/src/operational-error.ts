export class OperationalError extends Error {
  readonly #context?: string;
  readonly #severity: ErrorSeverity;
  readonly #mergeFields: MergeFields;

  public constructor({
    context,
    mergeFields,
    message,
    severity = "High",
  }: {
    context?: string;
    mergeFields?: MergeFields;
    message?: string;
    severity?: ErrorSeverity;
  } = {}) {
    super(message);
    this.#context = context;
    this.#severity = severity;
    this.#mergeFields = mergeFields;
  }

  static isOperationalError(error: Error): error is OperationalError {
    return error instanceof OperationalError;
  }

  get severity(): ErrorSeverity {
    return this.#severity ?? null;
  }

  get context(): string | null {
    return this.#context ?? null;
  }

  get name(): string {
    return this.constructor.name;
  }

  get mergeFields(): MergeFields {
    return this.#mergeFields;
  }

  toPlainObject(): Readonly<PlainError> {
    return Object.freeze({
      context: this.context,
      mergeFields: this.mergeFields,
      message: this.message,
      name: this.name,
      severity: this.severity,
    });
  }
}

type MergeFields = { [key: string]: { toString(): string } };
type ErrorSeverity = "High" | "Medium" | "Low";
interface PlainError {
  severity: ErrorSeverity;
  context: string;
  name: string;
  message: string;
  mergeFields: MergeFields;
}
