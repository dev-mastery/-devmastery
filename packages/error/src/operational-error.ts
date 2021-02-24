export class OperationalError extends Error {
  #context?: string;
  #severity: ErrorSeverity;
  #mergeFields: MergeFields;

  constructor({
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

  get context() {
    return this.#context ?? null;
  }

  get name() {
    return this.constructor.name;
  }

  get mergeFields() {
    return this.#mergeFields;
  }

  toPlainObject() {
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
