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
    brand: "#7ae582",
    accent: "#00a5cf",
    strong: "#004e64",
    soft: "#9fffcb",
    primary: "#25a18e",
    success: "#7ae582",
    warning: "#E6C36E",
    error: "#99325A",
  },
} as Theme;
