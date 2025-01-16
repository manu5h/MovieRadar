import { createContext } from "react";

export const Themes = {
  light: {
    foreground: "#000",
    background: "#fff",
    div_background: "rgba(222, 228, 231, 0.9)",
    view_more_background: "#f6f6f6d6",
  },
  dark: {
    foreground: "#fff",
    background: "#000",
    div_background: "rgba(31, 32, 32, 0.9)",
    view_more_background: "#040404d6",
  },
};

const ThemeContext = createContext(Themes.light);

export default ThemeContext;
