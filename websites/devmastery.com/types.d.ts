import "@emotion/react";
import type { Theme as SiteTheme } from "./src/theme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SiteTheme {}
}
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
