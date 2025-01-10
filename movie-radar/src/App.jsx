import ThemeContext, { Themes } from "./Components/Theme";
import logo from "../src/assets/Movie_radar_logo.png";
import { useState } from "react";
import moonImage from "../src/assets/moon.png";
import sunImage from "../src/assets/sun.png";

function App() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let defaultTheme = "";
  if (isDarkMode) {
    defaultTheme = Themes.dark;
  } else {
    defaultTheme = Themes.light;
  }
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);
  let themeImgURL = "";
  if (currentTheme === Themes.light) {
    themeImgURL = moonImage;
  } else {
    themeImgURL = sunImage;
  }

  return (
    <>
      <ThemeContext.Provider value={currentTheme}>
        <div
          style={{ height: "100vh", backgroundColor: currentTheme.background }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <img src={logo} width={"20%"}></img>
            <img
              src={themeImgURL}
              width={"40px"}
              height={"40px"}
              onClick={() => {
                setCurrentTheme(
                  currentTheme === Themes.light ? Themes.dark : Themes.light
                );
              }}
            />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
