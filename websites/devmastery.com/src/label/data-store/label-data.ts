import { OperationalError } from "@devmastery/error";

export function makeLabelDataStore({
  text,
  supportedLocales,
}: {
  text: Text;
  supportedLocales: Locale[];
}) {
  return Object.freeze({ byNamespaceLocale });

  async function byNamespaceLocale({
    namespace,
    locale,
  }: {
    namespace: string;
    locale: Locale;
  }) {
    validateLocale(locale);
    let ns = getNamespace(namespace);

    let localized = Object.fromEntries(
      Object.entries(ns).map(([key, value]) => [key, value[locale]])
    );
    return localized;
  }

  function getNamespace(namespace: string) {
    let ns = text[namespace];
    if (ns == null) {
      throw new MissingNamespaceError(namespace);
    }
    return ns;
  }

  function validateLocale(locale: Locale) {
    if (!supportedLocales.includes(locale)) {
      throw new UnsupportedLocaleError(locale);
    }
  }
}

type Text = {
  [key: string]: { [key: string]: { [key in Locale]?: string } };
};

class UnsupportedLocaleError extends OperationalError {
  constructor(locale: Locale) {
    super({
      message: `Locale "${locale}" is not supported.`,
      mergeFields: { locale },
      context: "Getting label data.",
    });
  }
}

class MissingNamespaceError extends OperationalError {
  constructor(namespace: string) {
    super({
      message: `Namespace "${namespace}" is missing.`,
      mergeFields: { namespace },
      context: "Getting label data.",
    });
  }
}
