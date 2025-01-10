import { createContext } from "react";

export const Themes = {
  light: {
    foreground: "#000",
    background: "#fff",
  },
  dark: {
    foreground: "#fff",
    background: "#000",
  },
};

const ThemeContext = createContext(Themes.light);

export default ThemeContext;
