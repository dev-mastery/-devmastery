import { useTheme } from "../theme/ThemeProvider";
import { RiSunFill as DarkIcon } from "react-icons/ri";
import { RiMoonFill as LightIcon } from "react-icons/ri";

export default function ThemeMode({ text }: { text: object }) {
  let { theme, setMode } = useTheme();
  let t = text ?? {};
  function changeMode(e: React.MouseEvent | React.KeyboardEvent) {
    if (
      (e as React.MouseEvent).button === 0 ||
      (e as React.KeyboardEvent).key === " " ||
      (e as React.KeyboardEvent).key === "Enter"
    ) {
      let mode = e.currentTarget.id === "dark-icon" ? "light" : "dark";
      setMode(mode);
    }
  }
  return theme.mode === "dark" ? (
    <DarkIcon
      id="dark-icon"
      tabIndex={6}
      onKeyUp={changeMode}
      onClick={changeMode}
      role="button"
      title={t["Switch to light mode."]}
      fill={theme.colors.warning}
      style={{ marginBottom: "-2px" }}
    />
  ) : (
    <LightIcon
      id="light-icon"
      tabIndex={6}
      onKeyUp={changeMode}
      onClick={changeMode}
      fill={theme.colors.warning}
      role="button"
      title={t["Switch to dark mode."]}
      style={{ marginBottom: "-2px" }}
    />
  );
}
