import * as languageCodes from "../../lib/language-codes.json";
import * as countryCodes from "../../lib/country-codes.json";
import { NonEmptyString } from "./NonEmptyString";
import type { NonEmptyStringValue } from "./NonEmptyString";

type CountryCode = keyof typeof countryCodes;
type LanguageCode = keyof typeof languageCodes;

export interface LanguageInfo {
  locale: Locale;
  name: string;
  nativeName: string;
}

export class Language {
  readonly #locale: Locale;
  readonly #name: string;
  readonly #nativeName: string;

  private constructor({
    locale,
    name,
    nativeName,
  }: {
    locale: Locale;
    name: NonEmptyStringValue;
    nativeName: NonEmptyStringValue;
  }) {
    this.#locale = locale;
    this.#name = name.toString();
    this.#nativeName = nativeName.toString();
  }

  public static from(locale: Locale): Language {
    const [langCode, variantCode] = locale.split("-");
    const lang = languageCodes[langCode as LanguageCode];
    const variant = variantCode
      ? countryCodes[variantCode as CountryCode]
      : null;
    const name = `${lang.name}${variant ? ` (${variant.name})` : ""}`;
    const nativeName = `${lang.nativeName.split(",")[0]}${
      variant ? ` (${variant.nativeName})` : ""
    }`;
    return new Language({
      locale: locale,
      name: NonEmptyString.of(name, "Language Name"),
      nativeName: NonEmptyString.of(nativeName, "Native Language Name"),
    });
  }

  public toJSON(): Readonly<LanguageInfo> {
    return {
      locale: this.locale,
      name: this.name,
      nativeName: this.nativeName,
    };
  }

  public get locale(): Locale {
    return this.#locale;
  }

  public get name(): string {
    return this.#name;
  }

  public get nativeName(): string {
    return this.#nativeName;
  }
}
