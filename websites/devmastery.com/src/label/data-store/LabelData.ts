import { Label } from "../entities/Label";
import { LabelKey } from "../entities/LabelKey";
import { LabelValue } from "../entities/LabelValue";

export class LabelData {
  #data: Label[];

  public constructor({
    labels,
  }: {
    labels: { [key: string]: { [key in Locale]?: string } };
  }) {
    this.#data = Object.entries(labels).map(([k, t]) =>
      Label.from({
        key: LabelKey.of(k),
        translations: new Map(
          Object.entries(t).map(([l, v]) => [
            l as Locale,
            LabelValue.of(v as string),
          ])
        ),
      })
    );
  }

  public async list(): Promise<Label[]> {
    return [...this.#data];
  }
}
