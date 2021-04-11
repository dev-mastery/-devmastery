import faker from "faker";
import { Label } from "../entities/Label";
import { LabelKey } from "../entities/LabelKey";
import { LabelValue } from "../entities/LabelValue";
import { LabelData } from "./LabelData";

describe("Label Data", () => {
  it("produces a strongly typed array of Labels", async () => {
    const key1 = faker.lorem.word();
    const key2 = faker.lorem.word();
    const key1en = faker.lorem.sentence();
    const key2en = faker.lorem.sentence();
    const key1fr = faker.lorem.sentence();
    const key2fr = faker.lorem.sentence();
    const labels = {
      [key1]: { en: key1en, fr: key1fr },
      [key2]: { en: key2en, fr: key2fr },
    };

    const labelData = new LabelData({ labels });

    const map1 = new Map<Locale, LabelValue>();
    map1.set("en", LabelValue.of(key1en));
    map1.set("fr", LabelValue.of(key1fr));

    const map2 = new Map<Locale, LabelValue>();
    map2.set("en", LabelValue.of(key2en));
    map2.set("fr", LabelValue.of(key2fr));
    const expected = [
      Label.from({
        key: LabelKey.of(key1),
        translations: map1,
      }),
      Label.from({
        key: LabelKey.of(key2),
        translations: map2,
      }),
    ];

    expect(await labelData.list()).toEqual(expected);
  });
});
