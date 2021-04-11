import { Label } from "../entities/Label";
import { LabelKey } from "../entities/LabelKey";
import { LabelValue } from "../entities/LabelValue";
import { makeLocalizeLabels } from "./localize-labels";

const key = "greeting";
const en = "Hello!";
const fr = "Bonjour!";
const translations = new Map<Locale, LabelValue>();
translations.set("en" as Locale, LabelValue.of(en));
translations.set("fr" as Locale, LabelValue.of(fr));
const label = Label.from({ key: LabelKey.of(key), translations });

const labelData = {
  list: async () => [label],
};

describe("Localize", () => {
  it("Localizes labels", async () => {
    const localize = makeLocalizeLabels({ labelData });
    const localizedEn = { [key]: en };
    const localizedFr = { [key]: fr };

    expect(await localize({ locale: "en" as Locale })).toEqual(localizedEn);
    expect(await localize({ locale: "fr" as Locale })).toEqual(localizedFr);
  });
});
