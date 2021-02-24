export function interpolate({
  text,
  mergeFields,
}: {
  text: string;
  mergeFields: { [key: string]: string | number };
}) {
  return Object.keys(mergeFields).reduce(
    (merged, field) =>
      merged.replace(`{{${field}}}`, mergeFields[field].toString()),
    text
  );
}
