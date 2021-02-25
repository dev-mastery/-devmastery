import { makeTranslate } from "./translate";
import { labelData } from "../data-store";
import { interpolate } from "../helpers/interpolate";

export const translate = makeTranslate({ labelData, interpolate });
