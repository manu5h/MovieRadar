import { useContext, useEffect, useState, useRef } from "react";
import ThemeContext, { Themes } from "./Theme";
import { useNavigate } from "react-router-dom";
import API_ENDPOINT from "../../Config";
import leftScroll from "../assets/left_Scroll.png";
import rightScroll from "../assets/right_Scroll.png";
import notAvailableImg from "../assets/notAvailable.jpg";
import SuggetionTilsHover from "./SuggetionTilsHover";
import OutsideClickHandler from "react-outside-click-handler";

const SuggestionTils = (props) => {
  const Theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opacity, setOpacity] = useState(0.5);
  const [hoverTileID, setHoverTileID] = useState(null);
  const navigate = useNavigate();

  // Reference for the scrollable container
  const scrollContainerRef = useRef();

  const blacklistedKeywords = [
    "porn",
    "xxx",
    "erotic",
    "explicit",
    "nude",
    "fetish",
    "sex",
    "adult",
    "hardcore",
  ];

  useEffect(() => {
    fetch(props.API)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [props.API]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 400;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 400;
    }
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0.5);

  return (
    <div
      className="Tills_main_div"
      style={{ backgroundColor: Theme.div_background }}
    >
      <h1 className="h1Style" style={{ color: Theme.foreground }}>
        {props.category}
      </h1>
      {/* Scroll Buttons */}
      <button
        className="scroll-btn-left-btn"
        onClick={scrollLeft}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={leftScroll} style={{ opacity: opacity, cursor: "pointer" }} />
      </button>
      <button
        className="scroll-btn-right-btn"
        onClick={scrollRight}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={rightScroll}
          style={{ opacity: opacity, cursor: "pointer" }}
        />
      </button>
      {/* Scrollable Content */}
      <div
        className="scroll-container"
        style={{ overflowX: "auto" }}
        ref={scrollContainerRef}
      >
        {data?.results?.map((movie) =>
          movie.poster_path &&
          movie.overview &&
          movie.title &&
          !blacklistedKeywords.some(
            (keyword) =>
              movie.title.toLowerCase().includes(keyword) ||
              movie.overview.toLowerCase().includes(keyword)
          ) ? (
            <div
              className="tile-full-div"
              key={movie.id}
              style={{
                transition: "transform 0.6s ease, opacity 0.6s ease",
                transform:
                  hoverTileID === movie.id ? "scale(1.05)" : "scale(1)",
                opacity:
                  hoverTileID === null || hoverTileID === movie.id ? 1 : 0.3,
              }}
            >
              {hoverTileID != movie.id ? (
                <div className="movie-poster">
                  <img
                    onMouseEnter={() => setHoverTileID(movie.id)}
                    onClick={() => setHoverTileID(movie.id)}
                    src={
                      movie.poster_path
                        ? `${API_ENDPOINT.IMG_URL}${movie.poster_path}`
                        : notAvailableImg
                    }
                    alt={movie.title}
                    style={{
                      border: `2px solid ${Theme.foreground}`,
                    }}
                  />
                  <h4
                    className="default-tile-h4"
                    style={{
                      color: Theme.foreground,
                    }}
                  >
                    {movie.title}
                  </h4>
                </div>
              ) : (
                <div
                  className="hover-tile"
                  onMouseLeave={() => setHoverTileID(null)}
                >
                  <OutsideClickHandler
                    onOutsideClick={() => setHoverTileID(null)}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <button
                        className="view-more-button"
                        onClick={() =>
                          navigate("/view-more", { state: { id: movie.id } })
                        }
                      >
                        View More...
                      </button>
                      <img
                        className="hover-backdrop-img"
                        src={
                          movie.backdrop_path
                            ? `${API_ENDPOINT.IMG_URL_Full_Res}${movie.backdrop_path}`
                            : `${API_ENDPOINT.IMG_URL_Full_Res}${movie.poster_path}`
                        }
                        alt={movie.title}
                      />

                      <SuggetionTilsHover
                        title={movie.title}
                        year={movie.release_date.slice(0, 4)}
                        lan={movie.original_language}
                        id={movie.id}
                      />
                    </div>
                  </OutsideClickHandler>
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default SuggestionTils;
