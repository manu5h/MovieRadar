import React, { useContext, useEffect, useState } from "react";
import API_ENDPOINT from "../../Config";
import ReactDOM from "react-dom";
import "../Style/SearchModel.css";
import notAvailableImg from "../assets/notAvailable.jpg";
import LanConvert from "./LangConvet";
import ThemeContext from "./Theme";
import { useNavigate } from "react-router-dom";

function SearchModel(prop) {
  const [data, setData] = useState(null);
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    // API call with replaced keyword
    fetch(API_ENDPOINT.Search_URL.replace(":KeyWord", prop.keyWord))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data from TMDB");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [prop.keyWord]);

  return ReactDOM.createPortal(
    <div className="search-model-main-div">
      {data && data.results ? (
        <>
          <h1 style={{ color: theme.foreground }}>
            Search Results for " {prop.keyWord} "
          </h1>
          {data.results.map((movie) => (
            <div key={movie.id} className="search-img-and-title-div">
              <img
                className="search-movie-image"
                src={
                  movie.poster_path
                    ? `${API_ENDPOINT.IMG_URL_Small}${movie.poster_path}`
                    : notAvailableImg
                }
                alt={movie.title || "Not Available"}
              />
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 style={{ marginRight: "10px", color: theme.foreground }}>
                    {movie.title}
                  </h3>
                  {movie.title !== movie.original_title && (
                    <>
                      <h3
                        style={{
                          marginRight: "10px",
                          color: theme.foreground,
                        }}
                      >
                        -
                      </h3>
                      <h4 style={{ color: theme.foreground }}>
                        {movie.original_title}
                      </h4>
                    </>
                  )}
                </div>
                <div>
                  <div style={{ display: "flex" }}>
                    {movie.release_date && (
                      <h4
                        style={{
                          marginRight: "10px",
                          color: theme.foreground,
                        }}
                      >
                        {movie.release_date.slice(0, 4)}
                      </h4>
                    )}
                    {movie.original_language && (
                      <>
                        <h4
                          style={{
                            marginRight: "10px",
                            color: theme.foreground,
                          }}
                        >
                          -
                        </h4>
                        <h4 style={{ color: theme.foreground }}>
                          {LanConvert(movie.original_language)}
                        </h4>
                      </>
                    )}
                  </div>
                </div>
                <button
                  className="search-view-more-button"
                  onClick={() =>
                    navigate("/view-more", { state: { id: movie.id } })
                  }
                >
                  View More...
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h1 style={{ color: theme.foreground }}>
          No Search Results for " {prop.keyWord} "
        </h1>
      )}
    </div>,
    document.getElementById("search-root")
  );
}

export default SearchModel;
