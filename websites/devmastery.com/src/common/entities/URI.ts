import { NonEmptyString } from "./NonEmptyString";

const URI_FORMAT = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i;
const MAX_LENGTH = 2000;
export class URI extends NonEmptyString.named("URI")
  .maxLength(MAX_LENGTH)
  .format(URI_FORMAT).BaseClass {
  public static get format(): RegExp {
    return URI_FORMAT;
  }

  public static get maxLength(): number {
    return MAX_LENGTH;
  }
}
