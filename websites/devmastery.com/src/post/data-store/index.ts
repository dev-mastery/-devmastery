import {
  makePath,
  readFile,
  readDir,
  fileExists,
} from "../../common/helpers/file-system";
import { makeDataStore } from "./post-data";
import localeConfig from "../../../locales.config";

const postsRoot = makePath(process.cwd(), "data", "posts");
export const postData = makeDataStore({
  postsRoot,
  makePath,
  readFile,
  readDir,
  fileExists,
  supportedLocales: localeConfig.locales as Locale[],
});
