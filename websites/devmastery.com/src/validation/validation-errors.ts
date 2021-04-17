import {
  OperationalError,
  ErrorSeverity,
  MergeFields,
} from "@devmastery/error";

export type ValidationError = OperationalError;

export class NullValueError extends OperationalError {
  constructor({
    label,
    message,
    mergeFields,
    ...props
  }: {
    label: string;
    context: string;
    message?: string;
    severity?: ErrorSeverity;
    mergeFields?: MergeFields;
  }) {
    super({
      message: message ?? `${label} cannot be null.`,
      mergeFields: mergeFields ? { label, ...mergeFields } : { label },
      ...props,
    });
  }
}

export class EmptyValueError extends OperationalError {
  constructor({
    label,
    message,
    mergeFields,
    ...props
  }: {
    label: string;
    context: string;
    message?: string;
    severity?: ErrorSeverity;
    mergeFields?: MergeFields;
  }) {
    super({
      message: message ?? `${label} cannot be empty.`,
      mergeFields: mergeFields ? { label, ...mergeFields } : { label },
      ...props,
    });
  }
}

export class BadFormatError extends OperationalError {
  constructor({
    format,
    label,
    message,
    mergeFields,
    ...props
  }: {
    context: string;
    format: RegExp;
    label: string;
    mergeFields?: MergeFields;
    message?: string;
    severity?: ErrorSeverity;
  }) {
    super({
      message: message ?? `${label} must conform to ${format.toString()}.`,
      mergeFields: mergeFields
        ? { label, format, ...mergeFields }
        : { label, format },
      ...props,
    });
  }
}

export class TooShortError extends OperationalError {
  constructor({
    label,
    mergeFields,
    message,
    minLength,
    ...props
  }: {
    context: string;
    minLength: number;
    label: string;
    mergeFields?: MergeFields;
    message?: string;
    severity?: ErrorSeverity;
  }) {
    super({
      message:
        message ??
        `${label} must be at least ${minLength.toString()} characters long.`,
      mergeFields: mergeFields
        ? { label, minLength, ...mergeFields }
        : { label, minLength },
      ...props,
    });
  }
}

export class TooLongError extends OperationalError {
  constructor({
    label,
    mergeFields,
    message,
    maxLength,
    ...props
  }: {
    context: string;
    maxLength: number;
    label: string;
    mergeFields?: MergeFields;
    message?: string;
    severity?: ErrorSeverity;
  }) {
    super({
      message:
        message ??
        `${label} must be at longer than ${maxLength.toString()} characters.`,
      mergeFields: mergeFields
        ? { label, maxLength, ...mergeFields }
        : { label, maxLength },
      ...props,
    });
  }
}

export class StringLengthError extends OperationalError {
  constructor({
    label,
    mergeFields,
    message,
    maxLength,
    minLength,
    ...props
  }: {
    context: string;
    maxLength: number;
    minLength: number;
    label: string;
    mergeFields?: MergeFields;
    message?: string;
    severity?: ErrorSeverity;
  }) {
    super({
      message:
        message ??
        `${label} must be between ${minLength.toString()} and ${maxLength.toString()} characters long.`,
      mergeFields: mergeFields
        ? { label, maxLength, ...mergeFields }
        : { label, maxLength },
      ...props,
    });
  }
}
