import { Label } from "../entities/Label";

interface LabelData {
  list(): Promise<Label[]>;
}

export function makeLocalizeLabels({ labelData }: { labelData: LabelData }) {
  return async function localize({
    locale,
  }: {
    locale: Locale;
  }): Promise<{ [k: string]: string }> {
    return Object.fromEntries(
      (await labelData.list()).map((label) => {
        return [label.key.toString(), label.translate(locale)];
      })
    );
  };
}
