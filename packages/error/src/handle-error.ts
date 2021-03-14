import { OperationalError } from "./operational-error";

interface Logger {
  debug(info: Record<string, unknown>): void;
  warn(info: Record<string, unknown>): void;
  error(info: Record<string, unknown>): void;
}

export function makeHandleError({ logger }: { logger: Logger }) {
  return function handleError(error: Error | OperationalError): void {
    if (!OperationalError.isOperationalError(error)) {
      // Though widely supported, "stack" is a non-standard property of Error
      // therefore we need to handle the case where it is undefined. - Bill
      logger.error({ message: error.message, stack: error.stack ?? null });
      throw error;
    }

    const errorInfo = error.toPlainObject();

    switch (error.severity) {
      case "Medium":
        logger.warn(errorInfo);
        break;
      case "Low":
        logger.debug(errorInfo);
        break;
      default:
        logger.error(errorInfo);
        break;
    }
  };
}
