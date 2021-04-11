import { Label } from "./Label";
import { LabelKey } from "./LabelKey";
import { LabelValue } from "./LabelValue";

describe("Label", () => {
  it("translates", () => {
    const key = "greeting";
    const en = "Hello, my friend!";
    const fr = "Bonjour, mon ami!";
    const translations = new Map<Locale, LabelValue>();
    translations.set("en", LabelValue.of(en));
    translations.set("fr", LabelValue.of(fr));
    const label = Label.from({ key: LabelKey.of(key), translations });
    expect(label.translate("fr")).toBe(fr);
    expect(label.translate("en")).toBe(en);
  });
  it("interpolates", () => {
    const key = "greeting";
    const name = "Joe";
    const mergeFields = { name };
    const en = "Hello, {{name}}!";
    const fr = "Bonjour, {{name}}!";
    const enMerged = en.replace("{{name}}", name);
    const frMerged = fr.replace("{{name}}", name);
    const translations = new Map<Locale, LabelValue>();
    translations.set("en", LabelValue.of(en));
    translations.set("fr", LabelValue.of(fr));
    const label = Label.from({ key: LabelKey.of(key), translations });
    expect(label.interpolate({ locale: "en", mergeFields })).toBe(enMerged);
    expect(label.interpolate({ locale: "fr", mergeFields })).toBe(frMerged);
  });
});
