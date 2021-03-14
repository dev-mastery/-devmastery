import type { TranslateLabelFn } from "./translate-label";
import type { Namespace } from "../data-store";

type Keys = { [key in Namespace]?: string[] };

type MergeFields = {
  [key in Namespace]?: {
    [p: string]: { [p: string]: string };
  };
};

export function makeTranslateLayout({
  translateLabel,
  keys,
}: {
  translateLabel: TranslateLabelFn;
  keys: Keys;
}) {
  return async function translateLayout({
    locale, mergeFields,
  }: {
    locale: Locale; mergeFields: MergeFields;
  }) {
    let labels = {};
    for (let namespace in keys) {
      if (keys.hasOwnProperty(namespace)) {
        for (let key of keys[namespace]) {
          labels[key] = await translateLabel({
            key,
            namespace: namespace as Namespace,
            locale,
            mergeFields: mergeFields[namespace]
              ? mergeFields[namespace][key]
              : undefined,
          });
        }
      }
    }
    return labels;
  };
}
