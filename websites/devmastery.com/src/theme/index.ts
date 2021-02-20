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
    medium: string;
  };
  fonts?: {
    body: string;
    heading: string;
    monospace: string;
  };
  space?: number[];
  fontSizes?: number[];
}

export default {
  mode: "light",
  scale: 1,
  colors: {
    black: "#000000",
    white: "#ffffff",
    dark: "#222222",
    light: "#f5f5f5",
    brand: "#009933",
    accent: "#00a5cf",
    strong: "#004e64",
    soft: "#9fffcb",
    primary: "#25a18e",
    success: "#7ae582",
    warning: "#E6C36E",
    error: "#99325A",
    medium: "#bbb",
  },
  fonts: {
    body: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif`,
    heading: `"Apple Garamond", "Baskerville", "Times New Roman", "Droid Serif", "Times","Source Serif Pro", serif`,
    monospace: `"SF Mono", "Monaco", "Inconsolata", "Fira Mono", "Droid Sans Mono", "Source Code Pro", monospace`,
  },
} as Theme;
