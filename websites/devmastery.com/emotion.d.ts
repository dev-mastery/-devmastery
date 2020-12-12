import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    mode: string;
    scale: number;
    colors: {
      black: string;
      white: string;
      dark: string;
      light: string;
      brand: string;
      accent: string;
      strong: string;
      soft: string;
      primary: string;
      success: string;
      warning: string;
      error: string;
    };
  }
}
