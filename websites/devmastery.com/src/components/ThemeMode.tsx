import { useTheme } from "../theme/ThemeProvider";
import { RiSunFill as LightIcon } from "react-icons/ri";
import { RiMoonFill as DarkIcon } from "react-icons/ri";

export default function ThemeMode({
  text,
}: {
  text: { [key: string]: string };
}): JSX.Element {
  const { theme, setMode } = useTheme();
  const t = text ?? {};
  function changeMode(e: React.MouseEvent | React.KeyboardEvent) {
    if (
      (e as React.MouseEvent).button === 0 ||
      (e as React.KeyboardEvent).key === " " ||
      (e as React.KeyboardEvent).key === "Enter"
    ) {
      const mode = e.currentTarget.id === "light-icon" ? "light" : "dark";
      setMode(mode);
    }
  }
  return theme.mode === "dark" ? (
    <LightIcon
      id="light-icon"
      tabIndex={6}
      onKeyUp={changeMode}
      onClick={changeMode}
      role="button"
      title={t["Switch to light mode."]}
      fill={theme.colors.warning}
      style={{ marginBottom: "-2px" }}
    />
  ) : (
    <DarkIcon
      id="dark-icon"
      tabIndex={6}
      onKeyUp={changeMode}
      onClick={changeMode}
      fill={theme.colors.medium}
      role="button"
      title={t["Switch to dark mode."]}
      style={{ marginBottom: "-2px" }}
    />
  );
}
