import ThemeContext, { Themes } from "./Components/Theme";
import logo from "../src/assets/Movie_radar_logo.png";
import { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import moonImage from "../src/assets/moon.png";
import sunImage from "../src/assets/sun.png";
import SuggestionTils from "./Components/SuggetionTils";
import API_ENDPOINT from "../Config";
import WebDescription from "./Components/WebDescription";
import Footer from "./Components/Footer";
import "../src/Style/App.css";
import { updateVisitorCount, updateUniqueVisitorCount } from "./firebase";

function App() {
  useEffect(() => {
    updateVisitorCount();
    updateUniqueVisitorCount();
  }, []);
  const ViewMorePage = lazy(() => import("./Components/ViewMorePage"));
  const FilterModel = lazy(() => import("./Components/FilterModel"));

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [showFilter, setShowFilter] = useState(false);
  const [enableFilter, setEnableFilter] = useState(false);
  const [searchAPI, setsearchAPI] = useState({});
  const [pageCount, setPageCount] = useState({});
  const [searchedFilters, setsearchedFilters] = useState({});
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
  if (currentTheme === Themes.light) {
    themeImgURL = moonImage;
  } else {
    themeImgURL = sunImage;
  }

  const handleSearchAPI = (API) => {
    setsearchAPI(API);
    setEnableFilter(true);
  };

  const handleSearchFilters = (filters) => {
    setsearchedFilters(filters);
  };

  const handlePageCountUpdate = (pages) => {
    setPageCount(pages);
  };

  return (
    <>
      <ThemeContext.Provider value={currentTheme}>
        <BrowserRouter basename="">
          <div
            className="first-page-bg"
            style={{ backgroundColor: currentTheme.background }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <WebDescription enableSearch={!enableFilter}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "15px",
                        }}
                      >
                        <img src={logo} className="logo" alt="Logo" />
                        <img
                          src={themeImgURL}
                          className="themeImg"
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
                          alt="Theme Toggle"
                        />
                      </div>
                    </WebDescription>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {enableFilter ? (
                        <button
                          className="filterButton"
                          onClick={() => {
                            setEnableFilter(false);
                            window.location.reload();
                          }}
                        >
                          Reset Filter
                        </button>
                      ) : (
                        <button
                          className="filterButton"
                          onClick={() => setShowFilter(true)}
                        >
                          <i className="fas fa-sliders-h fa-2x"></i>
                        </button>
                      )}
                    </div>

                    {enableFilter ? (
                      <>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category={
                              searchedFilters.genre && searchedFilters.language
                                ? `Search Results for "${searchedFilters.genre}" & "${searchedFilters.language}"`
                                : searchedFilters.genre
                                ? `Search Results for "${searchedFilters.genre}"`
                                : searchedFilters.language
                                ? `Search Results for "${searchedFilters.language}"`
                                : "Search Results"
                            }
                            API={searchAPI}
                            wrap="Enable"
                          />
                        </div>

                        {/* Render additional pages only if there are more than 1 page */}
                        {pageCount > 1 &&
                          Array.from({
                            length: Math.min(pageCount - 1, 13),
                          }).map((_, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <SuggestionTils
                                API={`${searchAPI}&page=${index + 2}`}
                                wrap="Enable"
                              />
                            </div>
                          ))}
                      </>
                    ) : (
                      <>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Top Picks"
                            API={API_ENDPOINT.Top_Picks}
                            wrap="disable"
                          />
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Trending Now"
                            API={API_ENDPOINT.Trending_Now}
                            wrap="disable"
                          />
                        </div>
                        {/* <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="New Releases"
                            API={API_ENDPOINT.New_Releases}
                            wrap="disable"
                          />
                        </div> */}
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Box Office Titans"
                            API={API_ENDPOINT.highest_Revenue}
                            wrap="disable"
                          />
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Best English"
                            API={API_ENDPOINT.Best_eng}
                            wrap="disable"
                          />
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Best Hindi"
                            API={API_ENDPOINT.Best_hindi}
                            wrap="disable"
                          />
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Best Tamil"
                            API={API_ENDPOINT.Best_tamil}
                            wrap="disable"
                          />
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Best Korean"
                            API={API_ENDPOINT.Best_korean}
                            wrap="disable"
                          />
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Best Sinhala"
                            API={API_ENDPOINT.Best_sinhala}
                            wrap="disable"
                          />
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <SuggestionTils
                            category="Comming Soon"
                            API={API_ENDPOINT.Comming_soon}
                            wrap="disable"
                          />
                        </div>
                      </>
                    )}

                    {showFilter && (
                      <Suspense fallback={<h1>Loading!!!</h1>}>
                        <FilterModel
                          onClose={() => setShowFilter(false)}
                          SearchAPI={handleSearchAPI}
                          selectedFilters={handleSearchFilters}
                          updatePageCount={handlePageCountUpdate}
                        />
                      </Suspense>
                    )}
                    <h6
                      style={{
                        color: currentTheme.foreground,
                        padding: "0 0 10px 10px",
                        fontSize: "12px",
                      }}
                    >
                      &#xB7; You can explore more movies by searching or
                      filtering them by genre.
                    </h6>
                    <Footer />
                  </>
                }
              ></Route>

              <Route
                path="/view-more"
                element={
                  <Suspense fallback={<h1>Loading!!!</h1>}>
                    <ViewMorePage />
                  </Suspense>
                }
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
