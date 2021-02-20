export class OperationalError extends Error {
  #context?: ErrorContext;
  #severity: ErrorSeverity;

  constructor({
    context,
    message,
    severity = "High",
  }: {
    context?: ErrorContext;
    message?: string;
    severity?: ErrorSeverity;
  } = {}) {
    super(message);
    this.#context = context;
    this.#severity = severity;
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

  toPlainObject() {
    return Object.freeze({
      context: this.context,
      message: this.message,
      name: this.name,
      severity: this.severity,
    });
  }
}
type ErrorContext = { [key: string]: any };
type ErrorSeverity = "High" | "Medium" | "Low";
