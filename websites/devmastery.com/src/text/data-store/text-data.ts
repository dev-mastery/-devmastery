export function makeTextDataStore({ text }: { text: Text }) {
  async function get({ key, locale }: { key: string; locale: Locale }) {
    return text[key] ? text[key][locale] ?? null : null;
  }
  return Object.freeze({ get });
}

export interface Text {
  [key: string]: { [key in Locale]?: string };
}
