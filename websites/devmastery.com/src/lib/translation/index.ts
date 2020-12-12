import text from "./text.json";
import languages from "./language-codes.json";
import i18n from "i18next";
import config from "../../../locales.config";
// NB: make sure translation happens at build time, not runtime.

export default {
  getNsText,
  getNamespace,
  getPageText,
  getLanguageName,
};

const commonNamespaces = ["header", "footer"];
const defaultMergeParams = {
  footer: {
    copyright: { currentYear: new Date().getFullYear() },
  },
};

async function init() {
  if (!i18n.isInitialized) {
    return i18n.init({
      fallbackLng: config.defaultLocale,
      ns: ["header", "footer", "homepage"],
      resources: toI18NextResources(text),
      supportedLngs: config.locales,
    });
  }
}

export function getNamespace({
  namespace,
  locale = config.defaultLocale,
}: {
  namespace: string;
  locale: string;
}) {
  return Object.freeze({
    getText: (key: string, params?: object) =>
      getNsText({ locale, namespace, key, params }),
  });
}

export async function getNsText({
  locale,
  namespace,
  key,
  params,
}: {
  locale: string;
  namespace: string;
  key: string;
  params?: object;
}) {
  await init();
  await i18n.changeLanguage(locale);
  return i18n.t(`${namespace}:${key}`, params);
}

export async function getPageText({
  locale,
  pageName,
  merge = {},
}: {
  locale: string;
  pageName: string;
  merge?: object;
}) {
  let pageText = {};
  let mergeParams = { ...defaultMergeParams, ...merge };

  for (let ns of [...commonNamespaces, pageName]) {
    let { getText } = getNamespace({ namespace: ns, locale });
    let nsParams = mergeParams[ns] ?? {};
    for (let key in text[ns]) {
      pageText[ns] = pageText[ns] ?? {};
      pageText[ns][key] = await getText(key, nsParams[key]);
    }
  }

  return pageText;
}

export function getLanguageName({ code }: { code: string }) {
  let lang: { name: string; nativeName: string } = languages[code];

  if (!lang?.name && code?.includes("-")) {
    lang = languages[code.split("-")[0]];
  }

  return { englishName: lang?.name, nativeName: lang?.nativeName };
}

function toI18NextResources(text) {
  let resources = {};
  for (let namespace in text) {
    for (let key in text[namespace]) {
      for (let language in text[namespace][key]) {
        resources[language] = resources[language] ?? {};
        resources[language][namespace] = resources[language][namespace] ?? {};
        resources[language][namespace][key] = text[namespace][key][language];
      }
    }
  }
  return resources;
}
