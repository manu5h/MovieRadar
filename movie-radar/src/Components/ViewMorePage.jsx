import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API_ENDPOINT from "../../Config";
import logo from "../assets//Movie_radar_logo.png";
import "../Style/ViewMore.css";
import ThemeContext from "./Theme";
import ShowGenre from "./ShowGenre";
import IMDB_img from "../assets/IMDB_Logo.png";
import Tomato_img from "../assets/Rotten_Tomatoes.svg.png";
import YouTubeVideo from "./YTVideoPlayer";
import notAvailableImg from "../assets/notAvailable.jpg";
import LanConvert from "./LangConvet";

function ViewMorePage() {
  const location = useLocation();
  const id = location.state?.id;
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data3, setData3] = useState(null);
  const theme = useContext(ThemeContext);
  let full_title = "";
  let bg_img_url = "";
  if (data1) {
    if (data1.title !== data1.original_title) {
      full_title = `(${data1.original_title})`;
    }

    bg_img_url = data1.backdrop_path
      ? `${API_ENDPOINT.IMG_URL_Full_Res}${data1.backdrop_path}`
      : `${API_ENDPOINT.IMG_URL_Full_Res}${data1.poster_path}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main data
        const response1 = await fetch(
          API_ENDPOINT.Additional_first_page.replace(":id", id)
        );
        if (!response1.ok)
          throw new Error("Failed to fetch additional first page data");
        const data1 = await response1.json();
        setData1(data1);

        // Fetch IMDB rating
        const response2 = await fetch(
          API_ENDPOINT.IMDB_rating.replace(":IMDB_Id", data1.imdb_id)
        );
        if (!response2.ok) throw new Error("Failed to fetch IMDB rating");
        const data2 = await response2.json();
        setData2(data2);

        // Fetch cast data
        const response3 = await fetch(API_ENDPOINT.Cast_URL.replace(":id", id));
        if (!response3.ok) throw new Error("Failed to fetch cast data");
        const data3 = await response3.json();
        setData3(data3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div
        className="view-more-background"
        style={{
          backgroundImage: bg_img_url ? `url(${bg_img_url})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <img src={logo} width={"200px"}></img>
        </div>
        {data1 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="view-more-main-div"
              style={{ backgroundColor: theme.view_more_background }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex" }}
                  className="view-more-poster-and-details"
                >
                  <img
                    className="view-more-poster-img"
                    src={
                      data1.poster_path
                        ? `${API_ENDPOINT.IMG_URL}${data1.poster_path}`
                        : notAvailableImg
                    }
                    alt={data1.title}
                  />
                  <div className="view-more-full-main-details">
                    <h1
                      style={{
                        color: theme.foreground,
                      }}
                    >
                      {data1.title}
                      {full_title}
                    </h1>
                    <h2
                      style={{
                        color: theme.foreground,
                      }}
                    >
                      {data1.release_date.slice(0, 4)}
                    </h2>
                    {data1.runtime ? (
                      <h2
                        style={{
                          color: theme.foreground,
                        }}
                      >
                        {Math.floor(data1.runtime / 60)} Hr {data1.runtime % 60}{" "}
                        Min
                      </h2>
                    ) : null}
                    <br></br>
                    <ShowGenre id={id} />
                    {data2 && data2.Ratings && (
                      <>
                        {data2.imdbRating != "N/A" ? (
                          <h4
                            style={{
                              display: "flex",
                              alignContent: "center",
                              marginTop: "10px",
                              color: theme.foreground,
                              marginLeft: "10px",
                            }}
                          >
                            <img
                              src={IMDB_img}
                              width={"40px"}
                              style={{ marginRight: "10px" }}
                            ></img>{" "}
                            {data2.imdbRating} ({data2.imdbVotes})
                          </h4>
                        ) : null}
                        {data2.Ratings.find(
                          (rating) => rating.Source === "Rotten Tomatoes"
                        )?.Value ? (
                          <h4
                            style={{
                              display: "flex",
                              alignContent: "center",
                              marginTop: "5px",
                              color: theme.foreground,
                              marginLeft: "10px",
                            }}
                          >
                            <img
                              src={Tomato_img}
                              width={"20px"}
                              style={{ marginRight: "10px" }}
                            ></img>{" "}
                            {
                              data2.Ratings.find(
                                (rating) => rating.Source === "Rotten Tomatoes"
                              )?.Value
                            }
                          </h4>
                        ) : null}
                      </>
                    )}
                  </div>
                </div>
                <YouTubeVideo movieId={id} />
              </div>
              <h4 style={{ color: theme.foreground, textAlign: "justify" }}>
                Overview : {data1.overview}
              </h4>
              <br></br>
              <div className="view-more-details-main-div">
                <div className="view-more-details-left-side">
                  <h4 style={{ color: theme.foreground }}>
                    Original Language : {LanConvert(data1.original_language)}
                  </h4>
                  <h4 style={{ color: theme.foreground }}>
                    Released on : {data1.release_date}
                  </h4>
                  {data3 && (
                    <h4 style={{ color: theme.foreground }}>
                      Director:{" "}
                      {data3.crew.find((crew) => crew.job === "Director")
                        ?.name || "Not Available"}
                    </h4>
                  )}
                  {data1 &&
                  Array.isArray(data1.production_companies) &&
                  data1.production_companies.length > 0 ? (
                    <>
                      {data1.production_companies.length === 1 ? (
                        // For single production company
                        <>
                          <h4
                            style={{
                              color: theme.foreground,
                            }}
                          >
                            Production:{" "}
                            {data1.production_companies[0].name ||
                              "Not Available"}
                          </h4>
                          {data1.production_companies[0].logo_path && (
                            <img
                              className="production-company-img"
                              src={`${API_ENDPOINT.IMG_URL}${data1.production_companies[0].logo_path}`}
                              alt={
                                data1.production_companies[0].name ||
                                "Image Not Available"
                              }
                            />
                          )}
                        </>
                      ) : (
                        // For multiple production companies
                        <>
                          {data1 && data1.production_companies.length > 0 ? (
                            <>
                              <h4
                                style={{
                                  color: theme.foreground,
                                }}
                              >
                                Production:{" "}
                                {data1.production_companies[0].name ||
                                  "Not Available"}
                              </h4>
                              {data1.production_companies[0].logo_path && (
                                <img
                                  className="production-company-img"
                                  src={`${API_ENDPOINT.IMG_URL}${data1.production_companies[0].logo_path}`}
                                  alt={
                                    data1.production_companies[0].name ||
                                    "Image Not Available"
                                  }
                                />
                              )}
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  ) : null}
                </div>

                {data3 && data3.cast.length > 0 ? (
                  <div>
                    <h4
                      style={{ textAlign: "center", color: theme.foreground }}
                    >
                      Cast
                    </h4>
                    <div className="view-more-details-right-side">
                      {data3 &&
                        data3.cast.map((cast) => (
                          <div className="cast-images">
                            <img
                              src={
                                cast.profile_path
                                  ? `${API_ENDPOINT.IMG_URL_Small}${cast.profile_path}`
                                  : notAvailableImg
                              }
                            />
                            <h3
                              style={{
                                color: theme.foreground,
                                fontSize: "12px",
                              }}
                            >
                              {cast.name}
                            </h3>
                            {cast.character ? (
                              <h4
                                style={{
                                  color: theme.foreground,
                                  fontSize: "12px",
                                }}
                              >
                                ({cast.character})
                              </h4>
                            ) : null}
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewMorePage;
