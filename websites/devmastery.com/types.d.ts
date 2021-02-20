import "@emotion/react";
import type { Theme as SiteTheme } from "./src/theme";

declare module "@emotion/react" {
  export interface Theme extends SiteTheme {}
}
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
