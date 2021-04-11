import { Theme, ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import {
  useContext,
  useState,
  createContext,
  PropsWithChildren,
  useEffect,
} from "react";
import initialTheme from ".";

const THEME_MODE_KEY = "THEME_MODE";
const THEME_SCALE_KEY = "THEME_SCALE";

const defaultContextData = {
  theme: initialTheme,
  setMode: (aMode: string) => aMode,
  setScale: (aScale: number) => aScale,
};

const ThemeContext = createContext(defaultContextData);
export const useTheme = (): typeof defaultContextData =>
  useContext(ThemeContext);

export default function ThemeProvider({
  children,
  theme,
}: PropsWithChildren<{ theme: Theme }>): JSX.Element {
  const [mode, _setMode] = useState<string>(theme.mode);
  const [scale, _setScale] = useState<number>(theme.scale);

  useEffect(() => {
    const savedMode: string =
      localStorage.getItem(THEME_MODE_KEY) ?? theme.mode;
    const savedScale: string | number =
      localStorage.getItem(THEME_SCALE_KEY) ?? theme.scale;

    _setMode(savedMode);
    _setScale(Number(savedScale));
  }, []);

  function setMode(aMode: string) {
    localStorage.setItem(THEME_MODE_KEY, aMode);
    _setMode(aMode);
    return aMode;
  }

  function setScale(aScale: number) {
    localStorage.setItem(THEME_SCALE_KEY, aScale.toString());
    _setScale(aScale);
    return aScale;
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
