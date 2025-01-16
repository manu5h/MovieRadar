import ThemeContext, { Themes } from "./Components/Theme";
import logo from "../src/assets/Movie_radar_logo.png";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import moonImage from "../src/assets/moon.png";
import sunImage from "../src/assets/sun.png";
import bg_dark from "../src/assets/main_bg_dark_low.jpg";
import bg_light from "../src/assets/main_bg_light_low.jpg";
import SuggestionTils from "./Components/SuggetionTils";
import API_ENDPOINT from "../Config";
import "../src/Style/App.css";
import ViewMorePage from "./Components/ViewMorePage";
import WebDescription from "./Components/WebDescription";

function App() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let refreshTheme = "";

  const checkStorage = localStorage.getItem("defaultTheme");

  if (!checkStorage) {
    if (isDarkMode) {
      localStorage.setItem("defaultTheme", "dark");
    } else {
      localStorage.setItem("defaultTheme", "light");
    }
  }

  const themefromStorage = localStorage.getItem("defaultTheme");

  if (themefromStorage === "dark") {
    refreshTheme = Themes.dark;
  } else {
    refreshTheme = Themes.light;
  }

  const [currentTheme, setCurrentTheme] = useState(refreshTheme);

  let themeImgURL = "";
  let bg_img_url = "";
  if (currentTheme === Themes.light) {
    themeImgURL = moonImage;
    bg_img_url = bg_light;
  } else {
    themeImgURL = sunImage;
    bg_img_url = bg_dark;
  }

  return (
    <>
      <ThemeContext.Provider value={currentTheme}>
        <BrowserRouter basename="/MovieRadar">
          <div
            className="first-page-bg"
            // style={{
            //   backgroundImage: bg_img_url ? `url(${bg_img_url})` : "none",
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            //   backgroundAttachment: "fixed", // This makes the background image stay in place
            // }}
            style={{ backgroundColor: currentTheme.background }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <WebDescription>
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
                            const newTheme =
                              currentTheme === Themes.light
                                ? Themes.dark
                                : Themes.light;

                            setCurrentTheme(newTheme);
                            if (newTheme === Themes.dark) {
                              localStorage.setItem("defaultTheme", "dark");
                            } else {
                              localStorage.setItem("defaultTheme", "light");
                            }
                          }}
                        />
                      </div>
                    </WebDescription>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <SuggestionTils
                        category="Top Picks"
                        API={API_ENDPOINT.Top_Picks}
                      />
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
                  </>
                }
              ></Route>
              <Route path="/view-more" element={<ViewMorePage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
