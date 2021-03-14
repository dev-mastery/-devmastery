import languageCodes from "../../lib/language-codes.json";
import countryCodes from "../../lib/country-codes.json";

export type Language = ReturnType<typeof languageFrom>;

export function languageFrom(locale: Locale) {
  let [languageCode, countryCode] = locale.split("-");
  let language = languageCodes[languageCode];
  let country = countryCodes[countryCode];
  let variant = country?.name ? `(${country.name})` : "";
  return Object.freeze({
    code: languageCode,
    locale,
    name: language ? `${language.name} ${variant}`.trim() : null,
    nativeName: (language?.nativeName ?? null) as string,
  });
}
