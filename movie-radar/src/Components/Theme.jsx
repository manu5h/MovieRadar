import { createContext } from "react";

export const Themes = {
  light: {
    foreground: "#000",
    background: "#fff",
    div_background: "#dee4e7",
    view_more_background: "#f6f6f6d6",
  },
  dark: {
    foreground: "#fff",
    background: "#000",
    div_background: "#37474f",
    view_more_background: "#040404d6",
  },
};

const ThemeContext = createContext(Themes.light);

export default ThemeContext;
