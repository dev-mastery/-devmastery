import {
  makePath,
  readFile,
  readDir,
  fileExists,
} from "../../common/helpers/file-system";
import { makeDataStore } from "./post-data";
import localeConfig from "../../../locales.config";
import { postFromMarkdown } from "../helpers/from-markdown";

const postsRoot = makePath(process.cwd(), "data", "posts");
export const postData = makeDataStore({
  fileExists,
  makePath,
  postFromMarkdown,
  postsRoot,
  readDir,
  readFile,
  supportedLocales: localeConfig.locales as Locale[],
});
