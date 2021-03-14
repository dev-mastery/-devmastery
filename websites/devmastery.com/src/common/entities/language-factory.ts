import languageCodes from "../../lib/language-codes.json";
import countryCodes from "../../lib/country-codes.json";

export type LanguageFactory = ReturnType<typeof languageFrom>;

export function languageFrom(locale: Locale) {
  const [languageCode, countryCode] = locale.split("-");
  const language = languageCodes[languageCode];
  const country = countryCodes[countryCode];
  const variant = country?.name ? `(${country.name})` : "";
  return Object.freeze({
    code: languageCode,
    locale,
    name: language ? `${language.name} ${variant}`.trim() : null,
    nativeName: (language?.nativeName ?? null) as string,
  });
}
