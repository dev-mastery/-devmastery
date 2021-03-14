import { OperationalError } from "@devmastery/error";
import type { Namespace } from "../data-store";

export function makeTranslateLabel({
  labels,
  interpolate,
  supportedLocales,
}: {
  labels: LabelData;
  interpolate: InterpolateFn;
  supportedLocales: Locale[];
}) {
  return async function translateLabel({
    key,
    namespace = "glossary",
    locale,
    mergeFields,
  }: TranslateProps) {
    validateLocale(locale);

    let label = await labels.get({ key, namespace });
    let localized = label[locale];

    let interpolated =
      mergeFields && localized
        ? interpolate({ text: localized, mergeFields })
        : localized;

    return interpolated;
  };

  function validateLocale(locale: Locale) {
    if (!supportedLocales.includes(locale)) {
      throw new UnsupportedLocaleError(locale);
    }
  }
}

class UnsupportedLocaleError extends OperationalError {
  constructor(locale: Locale) {
    super({
      message: `Locale "${locale}" is not supported.`,
      mergeFields: { locale },
      context: "Translating label.",
    });
  }
}

interface LabelData {
  get({ key, namespace }): Promise<Label>;
}

type Label = { [key in Locale]?: string };

type InterpolateFn = (props: {
  text: string;
  mergeFields: { [key: string]: string | number };
}) => string;

export interface TranslateProps {
  key: string;
  locale: Locale;
  mergeFields?: { [key: string]: string | number };
  namespace?: Namespace;
}

export type TranslateLabelFn = ReturnType<typeof makeTranslateLabel>