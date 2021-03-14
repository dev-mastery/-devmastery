import { makeLabelDataStore } from "../data-store/label-data";
import { makeTranslateLabel } from "./translate-label";
import {makeTranslateLayout} from "./translate-layout";
import { interpolate } from "../helpers/interpolate";
import { locales } from "../../../locales.config";

describe("Labels", () => {
  it("translates a label", async () => {
    const labels = {
      common: {
        keyA: {
          en: "I am key A of the 'common' namespace.",
          fr: "Je suis la clé 'A' de l'espace de nom 'common'.",
        },
        "key B": {
          en: "I am key B of the 'common' namespace.",
          fr: "Je suis la clé B de l'espace de nom A.",
        },
      },
    };
    const labelData = makeLabelDataStore({ labels });
    const translateLabel = makeTranslateLabel({
      labels: labelData,
      interpolate,
      supportedLocales: locales as Locale[],
    });

    expect(
      await translateLabel({ key: "keyA", namespace: "common", locale: "en" })
    ).toBe(labels["common"]["keyA"]["en"]);

    expect(
      await translateLabel({
        key: "keyA",
        namespace: "common",
        locale: "fr",
      })
    ).toBe(labels["common"]["keyA"]["fr"]);
  });
  it("uses merge fields", async () => {
    const labels = {
      glossary: {
        hello: {
          en: `Hello, {{name}}!`,
          fr: `Bonjour, {{name}}!`,
        },
      },
    };
    const labelData = makeLabelDataStore({ labels });
    const translateLabel = makeTranslateLabel({
      labels: labelData,
      interpolate,
      supportedLocales: locales as Locale[],
    });
    expect(
      await translateLabel({
        key: "hello",
        namespace: "glossary",
        locale: "en",
        mergeFields: { name: "Bill" },
      })
    ).toBe("Hello, Bill!");

    expect(
      await translateLabel({
        key: "hello",
        locale: "fr",
        mergeFields: { name: "Bill" },
      })
    ).toBe("Bonjour, Bill!");
  });
  it("translates the layout", async ()=> {
    const labels = {
      common: {
        hello: {
          en: `Hello, {{name}}!`,
          fr: `Bonjour, {{name}}!`,
        }, goodbye: {
          en: `Bye!`,
          fr: `Aurevoir!`,
        },
      },
      "navigation": {
        "navOne": {
          "en": "Nav 1",
          "fr": "Nav un"
        }
      }
    };
    const mergeFields = {"common": {"hello": {"name":"Bill"}}}
    const locale = "en"
    const labelData = makeLabelDataStore({ labels });
    const translateLabel = makeTranslateLabel({
      labels: labelData,
      interpolate,
      supportedLocales: locales as Locale[],
    });
    const keys = {"common": ["hello", "goodbye"], "navigation": ["navOne"]}
    const translateLayout = makeTranslateLayout({translateLabel,keys})
    expect(await translateLayout({locale:"en", mergeFields}))
        .toEqual({"hello": "Hello, Bill!",
          "goodbye": "Bye!",
          "navOne": "Nav 1"});
    expect(await translateLayout({locale:"fr", mergeFields}))
        .toEqual({"hello": "Bonjour, Bill!",
          "goodbye": "Aurevoir!",
          "navOne": "Nav un"});
  })
});