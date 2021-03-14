import faker from "faker";

import { FullText } from "../../common/entities";
import {
  Duration,
  DurationDecimalError,
  DurationLessThanZeroError,
  DurationNaNError,
} from "./Duration";

describe("Duration", () => {
  it("Has to be a positive number", () => {
    expect(() => Duration.of(-1)).toThrow(DurationLessThanZeroError);
  });

  it("Has to be a whole number", () => {
    expect(() => Duration.of(0.5)).toThrow(DurationDecimalError);
  });

  it("Has to be an actual number", () => {
    expect(() => Duration.of(NaN)).toThrow(DurationNaNError);
  });

  it("Reports the duration in minutes", () => {
    const value = 5;
    const duration = Duration.of(value);
    expect(duration.minutes).toBe(value);
    expect(duration.toJSON()).toMatchObject({ minutes: value });
  });

  it("calculates reading time for a bunch of text", () => {
    const words = faker.lorem.words(450);
    const duration = Duration.calculate(FullText.of(words));
    expect(duration.minutes).toBe(2);
    const customDuration = Duration.calculate(FullText.of(words), {
      wordsPerMinute: 10,
    });
    expect(customDuration.minutes).toBe(45);
  });
});
