import { useContext, useEffect, useState, useRef } from "react";
import ThemeContext, { Themes } from "./Theme";
import API_ENDPOINT from "../../Config";
import leftScroll from "../assets/left_Scroll.png";
import rightScroll from "../assets/right_Scroll.png";
import notAvailableImg from "../assets/notAvailable.jpg";

const SuggestionTils = (props) => {
  const Theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opacity, setOpacity] = useState(0.5);

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
        {data?.results?.map((movie) => (
          <div
            key={movie.id}
            style={{
              margin: "50px 10px 10px 10px",
            }}
          >
            <img
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
        ))}
      </div>
    </div>
  );
};

export default SuggestionTils;
