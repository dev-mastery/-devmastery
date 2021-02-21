import { OperationalError } from "@devmastery/error";

export type Duration = ReturnType<typeof durationFrom>;

export function minutesToRead(
  text: string,
  options: { wordsPerMinute: number } = { wordsPerMinute: 200 }
) {
  let minutes = 0;
  if (Boolean(text?.length)) {
    minutes = text.split(" ").length / options.wordsPerMinute;
  }
  return durationFrom(minutes);
}

export function durationFrom(number: number) {
  let minutes = Math.round(number);
  validateDuration(minutes);
  return Object.freeze({
    minutes,
    toPlainObject: () => ({ minutes }),
  });
}

function validateDuration(value: number) {
  if (!isValidDuration(value)) {
    throw new InvalidDurationError();
  }
}

export function isValidDuration(value: number) {
  return value != null && value >= 0 && value % 1 === 0;
}

class InvalidDurationError extends OperationalError {
  constructor(context?: object) {
    super({
      context,
      message: "Invalid duration. Duration must be a positive whole number.",
    });
  }
}
