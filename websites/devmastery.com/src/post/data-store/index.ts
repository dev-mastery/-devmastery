// import {
//   makePath,
//   readFile,
//   readDir,
//   fileExists,
// } from "../../common/helpers/file-system";
// import localeConfig from "../../../locales.config";
// import { PostData } from "./PostData";
// import { fromMarkdown as postFromMarkdown } from "../mappers";

// const postsRoot = makePath(process.cwd(), "data", "posts");
// const postData = new PostData({
//   fileExists,
//   makePath,
//   postFromMarkdown,
//   postsRoot,
//   readDir,
//   readFile,
//   supportedLocales: localeConfig.locales as Locale[],
// });

// export { postData };
export * as postData from "./post-data";
