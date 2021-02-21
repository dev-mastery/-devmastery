export function makeGetText({ textData, interpolate }: GetTextDependencies) {
  return async function getText({ mergeFields, key, locale }: GetTextProps) {
    let text = (await textData.get({ locale, key })) ?? key;
    if (mergeFields != null) {
      text = interpolate({ text, mergeFields });
    }
    return text;
  };
}

interface GetTextDependencies {
  textData: TextData;
  interpolate: InterpolateFn;
}

interface TextData {
  get(props: { key: string; locale: Locale }): Promise<string>;
}

type InterpolateFn = (props: {
  text: string;
  mergeFields: { [key: string]: string | number };
}) => string;

interface GetTextProps {
  locale: Locale;
  key: string;
  mergeFields?: { [key: string]: string | number };
}
