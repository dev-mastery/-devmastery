import typescriptPlugin from "rollup-plugin-typescript2";
import pkg from "./package.json";
import typescript from "typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescriptPlugin({
      typescript,
    }),
  ],
};
