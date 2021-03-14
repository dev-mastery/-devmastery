import {NonEmptyString} from "../../common/entities";
import {Namespace} from "../data-store";

export type Label = ReturnType<typeof labelOf>;

export function labelOf({
  namespace,
  key,
  translations
}: {
  namespace: Namespace,
  key: NonEmptyString,
  translations: { [key in Locale]?: string }
}) {
  return Object.freeze({
    toLocaleString, getNamespace, getKey
  })

  function toLocaleString(locale: Locale) {
    return translations[locale];
  }

  function getNamespace() {
    return namespace
  }

  function getKey() {
    return key.toString();
  }
}