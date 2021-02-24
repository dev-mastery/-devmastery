export function makeTranslate({
  labelData,
  interpolate,
}: TranslateDependencies) {
  return async function translate({
    namespaces,
    locale,
    mergeFields,
  }: TranslateProps) {
    // TODO: Caching, maybe?
    let localized = (
      await Promise.all(
        ["common", ...namespaces].map((namespace) =>
          labelData.byNamespaceLocale({ locale, namespace })
        )
      )
    ).reduce((merged, ns) => ({ ...merged, ...ns }));

    if (mergeFields != null) {
      localized = Object.fromEntries(
        Object.entries(localized).map(([key, text]) => [
          key,
          interpolate({ text, mergeFields }),
        ])
      );
    }
    return localized;
  };
}

interface TranslateDependencies {
  labelData: LabelData;
  interpolate: InterpolateFn;
}

interface LabelData {
  byNamespaceLocale({
    namespace,
    locale,
  }: {
    namespace: string;
    locale: Locale;
  }): Promise<{ [key: string]: string }>;
}

type InterpolateFn = (props: {
  text: string;
  mergeFields: { [key: string]: string | number };
}) => string;

interface TranslateProps {
  locale: Locale;
  mergeFields?: { [key: string]: string | number };
  namespaces: string[];
}
