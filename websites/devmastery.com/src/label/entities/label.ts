import { LabelKey } from "./LabelKey";
import { LabelValue } from "./LabelValue";
import { interpolate } from "../helpers/interpolate";

export interface LabelInfo {
  [key: string]: {
    [key in Locale]?: string;
  };
}

export class Label {
  readonly #key: LabelKey;
  readonly #translations: { [key in Locale]?: string };

  private constructor({
    key,
    translations,
  }: {
    key: LabelKey;
    translations: { [key in Locale]?: string };
  }) {
    this.#key = key;
    this.#translations = translations;
  }

  public static from(props: {
    key: LabelKey;
    translations: Map<Locale, LabelValue>;
  }): Label {
    const translations = Object.fromEntries(
      Array.from(props.translations.entries()).map(([l, v]) => [
        l,
        v.toString(),
      ])
    );
    const key = props.key;
    return new Label({ key, translations });
  }

  public translate(locale: Locale): string {
    if (this.availableLocales.includes(locale)) {
      return this.translations[locale] as string;
    }
    // TODO: Proper error
    throw new RangeError("Unsupported locale");
  }

  public interpolate({
    locale,
    mergeFields,
  }: {
    locale: Locale;
    mergeFields: { [key: string]: string | number };
  }): string {
    return interpolate({ text: this.translate(locale), mergeFields });
  }

  public toJSON(): LabelInfo {
    return {
      [this.key.toString()]: this.#translations,
    };
  }

  public get availableLocales(): Locale[] {
    return Object.keys(this.translations) as Locale[];
  }

  public get translations(): { [key in Locale]?: string } {
    return this.#translations;
  }

  public get key(): LabelKey {
    return this.#key;
  }
}
