import { createContext } from "react";

export const Themes = {
  light: {
    foreground: "#000",
    background: "#fff",
    div_background: "#dee4e7"
  },
  dark: {
    foreground: "#fff",
    background: "#000",
    div_background: "#37474f"
  },
};

const ThemeContext = createContext(Themes.light);

export default ThemeContext;
