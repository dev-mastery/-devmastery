import { makeGetText } from "./get-text";
import { textDataStore as textData } from "../data-store";
import { interpolate } from "../helpers/interpolate";

export const getText = makeGetText({ textData, interpolate });
