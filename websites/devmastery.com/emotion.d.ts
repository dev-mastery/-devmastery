import "@emotion/react";
import type { Theme as SiteTheme } from "./src/theme";

declare module "@emotion/react" {
  export interface Theme extends SiteTheme {}
}
