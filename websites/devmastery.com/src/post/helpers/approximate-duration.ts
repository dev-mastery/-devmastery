import time from "reading-time";

export function approximateDuration(text: string) {
  if (text == null) return 0;
  return Math.round(time(text).minutes);
}
