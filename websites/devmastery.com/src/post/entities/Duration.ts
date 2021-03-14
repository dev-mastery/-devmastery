import { OperationalError } from "@devmastery/error";
import { Validation } from "../../common/entities";
import { FullText } from "../../common/entities";

const DEFAULT_WORDS_PER_MINUTE = 200;

export interface DurationInfo {
  minutes: number;
}

export class Duration {
  #value: number;
  readonly #minutes: number;
  private constructor(value: number) {
    this.#value = value;
    this.#minutes = Math.round(Math.abs(value));
  }

  public static of(value: number): Duration {
    Duration.validate(value).throwIfNotValid();
    return new Duration(value);
  }

  public static calculate(
    text: FullText,
    options: { wordsPerMinute: number } = {
      wordsPerMinute: DEFAULT_WORDS_PER_MINUTE,
    }
  ): Duration {
    let minutes = 0;
    minutes = text.toString().split(" ").length / options.wordsPerMinute;
    return Duration.of(Math.round(Math.abs(minutes)));
  }

  public static validate(value: number): Validation {
    if (Number.isNaN(value)) {
      return Validation.failed(new DurationNaNError());
    }
    if (value % 1 !== 0) {
      return Validation.failed(new DurationDecimalError());
    }
    if (value < 0) {
      return Validation.failed(new DurationLessThanZeroError());
    }
    return Validation.passed();
  }

  public get minutes(): number {
    return this.#minutes;
  }

  public toJSON(): DurationInfo {
    return { minutes: this.minutes };
  }
}

export class DurationLessThanZeroError extends OperationalError {
  constructor() {
    super({
      message: "Duration must be a whole number greater than zero.",
      context: "Creating a duration",
    });
  }
}

export class DurationNaNError extends OperationalError {
  constructor() {
    super({
      message: "Duration must be a whole number greater than zero.",
      context: "Creating a duration",
    });
  }
}

export class DurationDecimalError extends OperationalError {
  constructor() {
    super({
      message: "Duration must be a whole number greater than zero.",
      context: "Creating a duration",
    });
  }
}
