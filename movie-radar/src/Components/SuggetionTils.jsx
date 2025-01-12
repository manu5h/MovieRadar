import { useContext, useEffect, useState, useRef } from "react";
import ThemeContext, { Themes } from "./Theme";
import API_ENDPOINT from "../../Config";
import leftScroll from "../assets/left_Scroll.png";
import rightScroll from "../assets/right_Scroll.png";
import notAvailableImg from "../assets/notAvailable.jpg";
import SuggetionTilsHover from "./SuggetionTilsHover";

const SuggestionTils = (props) => {
  const Theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opacity, setOpacity] = useState(0.5);
  const [hoverTileID, setHoverTileID] = useState(null);

  // Reference for the scrollable container
  const scrollContainerRef = useRef();

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

  if (error) return <div>ERROR: {error}</div>;
  if (loading) return <div>Loading...</div>;

  // Inline styles
  const Tills_main_div = {
    height: "400px",
    backgroundColor: Theme.div_background,
    width: "100%",
    overflow: "hidden",
    position: "relative",
    margin: "10px 0 30px 0",
  };

  const h1Style = {
    color: Theme.foreground,
    paddingLeft: "15px",
    margin: "5px",
    position: "absolute",
    top: "10px",
  };

  // Scroll handlers
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
    <div style={Tills_main_div}>
      <h1 style={h1Style}>{props.category}</h1>
      {/* Scroll Buttons */}
      <button
        className="scroll-btn left-btn"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "transparent",
          border: "none",
        }}
        onClick={scrollLeft}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={leftScroll} style={{ opacity: opacity, cursor: "pointer" }} />
      </button>
      <button
        className="scroll-btn right-btn"
        style={{
          position: "absolute",
          right: "0px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          backgroundColor: "transparent",
          border: "none",
        }}
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
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          padding: "10px",
          scrollBehavior: "smooth",
        }}
        ref={scrollContainerRef}
      >
        {data?.results?.map((movie) =>
          movie.poster_path ? (
            <div
              key={movie.id}
              style={{
                margin: "50px 10px 10px 10px",
                transition: "transform 0.6s ease, opacity 0.6s ease",
                transform:
                  hoverTileID === movie.id ? "scale(1.05)" : "scale(1)",
                opacity:
                  hoverTileID === null || hoverTileID === movie.id ? 1 : 0.3,
              }}
            >
              {hoverTileID != movie.id ? (
                <div>
                  <img
                    onMouseEnter={() => setHoverTileID(movie.id)}
                    src={
                      movie.poster_path
                        ? `${API_ENDPOINT.IMG_URL}${movie.poster_path}`
                        : notAvailableImg
                    }
                    alt={movie.title}
                    style={{
                      marginTop: "10px",
                      width: "150px",
                      height: "225px",
                      borderRadius: "10px",
                      border: `2px solid ${Theme.foreground}`,
                    }}
                  />
                  <h4
                    style={{
                      paddingLeft: "10px",
                      color: Theme.foreground,
                      margin: "0",
                      height: "95px",
                    }}
                  >
                    {movie.title}
                  </h4>
                </div>
              ) : (
                <div
                  style={{
                    transition: "transform 0.6s ease, opacity 0.6s ease",
                    height: "250px",
                    width: "400px",
                    borderRadius: "10px",
                    boxShadow: "6px 6px 8px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseLeave={() => setHoverTileID(null)}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      src={
                        movie.backdrop_path
                          ? `${API_ENDPOINT.IMG_URL_Full_Res}${movie.backdrop_path}`
                          : `${API_ENDPOINT.IMG_URL_Full_Res}${movie.poster_path}`
                      }
                      alt={movie.title}
                      style={{
                        width: "400px",
                        height: "250px",
                        borderRadius: "10px",
                        opacity: "0.5",
                      }}
                    />
                    <SuggetionTilsHover
                      title={movie.title}
                      year={movie.release_date.slice(0, 4)}
                      lan={movie.original_language}
                      id={movie.id}
                    />
                  </div>
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
