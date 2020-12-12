import { Theme, ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  useEffect,
} from "react";
import theme from ".";

const THEME_MODE_KEY = "THEME_MODE";
const THEME_SCALE_KEY = "THEME_SCALE";

const defaultContextData = {
  theme,
  setMode: (mode: string) => {},
  setScale: (scale: number) => {},
};

const ThemeContext = createContext(defaultContextData);
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({
  children,
  theme,
}: PropsWithChildren<{ theme: Theme }>) {
  const [mode, _setMode] = useState<string>(theme.mode);
  const [scale, _setScale] = useState<number>(theme.scale);

  useEffect(() => {
    let savedMode: string = localStorage.getItem(THEME_MODE_KEY) ?? theme.mode;
    let savedScale: string | number =
      localStorage.getItem(THEME_SCALE_KEY) ?? theme.scale;

    _setMode(savedMode);
    _setScale(Number(savedScale));
  }, []);

  function setMode(mode: string) {
    localStorage.setItem(THEME_MODE_KEY, mode);
    _setMode(mode);
  }

  function setScale(scale: number) {
    localStorage.setItem(THEME_SCALE_KEY, scale.toString());
    _setScale(scale);
  }

  function computeTheme() {
    return { ...theme, mode, scale };
  }

  return (
    <EmotionThemeProvider theme={computeTheme()}>
      <ThemeContext.Provider
        value={{ theme: computeTheme(), setMode, setScale }}
      >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
}
