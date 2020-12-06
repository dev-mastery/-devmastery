import text from "./text.json";
import languages from "./language-codes.json";

// TODO Consider a more robust solution like i18next but make sure translation
// happens at build time, not runtime, to keep things moving fast.

export default {
  getPageText,
  getNamespaceText,
  getLanguageName,
};

const commonNamespaces = ["menu", "footer"];

export function getPageText({ locale, pageName, fallbackLocale }) {
  let common = commonNamespaces.reduce((t, ns) => {
    t[ns] = getNamespaceText({ locale, fallbackLocale, namespace: ns });
    return t;
  }, {});

  let page = {
    [pageName]: getNamespaceText({
      locale,
      fallbackLocale,
      namespace: pageName,
    }),
  };

  return { ...common, ...page };
}

export function getNamespaceText({ locale, namespace, fallbackLocale }) {
  if (!text[namespace]) return null;
  return Object.keys(text[namespace]).reduce((acc, k) => {
    acc[k] = text[namespace][k][locale ?? fallbackLocale];
    return acc;
  }, {});
}

export function getLanguageName({ code }: { code: string }) {
  let lang: { name: string; nativeName: string } = languages[code];

  if (!lang?.name && code?.includes("-")) {
    lang = languages[code.split("-")[0]];
  }

  return { englishName: lang?.name, nativeName: lang?.nativeName };
}
