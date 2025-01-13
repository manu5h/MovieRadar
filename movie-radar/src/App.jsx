import ThemeContext, { Themes } from "./Components/Theme";
import logo from "../src/assets/Movie_radar_logo.png";
import { useState } from "react";
import moonImage from "../src/assets/moon.png";
import sunImage from "../src/assets/sun.png";
import SuggestionTils from "./Components/SuggetionTils";
import API_ENDPOINT from "../Config";
import "../src/Style/App.css";

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
        <div style={{ backgroundColor: currentTheme.background }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <img src={logo} width={"200px"}></img>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils category="Top Picks" API={API_ENDPOINT.Top_Picks} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="Trending Now"
              API={API_ENDPOINT.Trending_Now}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="New Releases"
              API={API_ENDPOINT.New_Releases}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="Box Office Titans"
              API={API_ENDPOINT.highest_Revenue}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="Best English"
              API={API_ENDPOINT.Best_eng}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="Best Hindi"
              API={API_ENDPOINT.Best_hindi}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="Best Tamil"
              API={API_ENDPOINT.Best_tamil}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="Best Korean"
              API={API_ENDPOINT.Best_korean}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="Best Sinhala"
              API={API_ENDPOINT.Best_sinhala}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SuggestionTils
              category="Comming Soon"
              API={API_ENDPOINT.Comming_soon}
            />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
