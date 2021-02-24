import { makeLabelDataStore } from "./label-data";
import localeConfig from "../../../locales.config";
import text from "../../../data/labels/index.json";

export const labelData = makeLabelDataStore({
  text,
  supportedLocales: localeConfig.locales as Locale[],
});
