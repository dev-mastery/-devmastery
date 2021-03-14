import { makeLabelDataStore } from "./label-data";
import common from "../../../data/labels/common.json";
import navigation from "../../../data/labels/navigation.json";
import glossary from "../../../data/labels/glossary.json";

export type { Namespace } from "./label-data";

export const labelData = makeLabelDataStore({
  labels: { common, navigation, glossary },
});
