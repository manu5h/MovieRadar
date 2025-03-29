import { useContext, useEffect, useState, useRef } from "react";
import API_ENDPOINT from "../../Config";
import IMDB_img from "../assets/IMDB_Logo.png";
import Tomato_img from "../assets/Rotten_Tomatoes.svg.png";
import ShowGenre from "./ShowGenre";
import LanConvert from "./LangConvet";

function SuggetionTilsHover(props) {
  const [data, setData] = useState(null);
  const [IMDB, setIMDB] = useState(null);
  
  useEffect(() => {
    fetch(API_ENDPOINT.Additional_first_page.replace(":id", props.id))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        fetch(API_ENDPOINT.IMDB_rating.replace(":IMDB_Id", data.imdb_id))
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setIMDB(data);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [props.id]);

  const lan = LanConvert(props.lan);

  return (
    <div className="hoverDivStyle">
      <div className="hoverDivStyle-second">
        <h3>{props.title}</h3>
        <h5>Year: {props.year}</h5>
        <h5>Language: {lan}</h5>
        {data &&
          (data.runtime ? (
            <h5>
              Running Time: {Math.floor(data.runtime / 60)} Hr{" "}
              {data.runtime % 60} Min
            </h5>
          ) : null)}
        {IMDB && IMDB.Ratings && (
          <>
            {IMDB.imdbRating != "N/A" ? (
              <h6
                style={{
                  fontSize: "12px",
                  display: "flex",
                  alignContent: "center",
                  marginTop: "10px",
                }}
              >
                <img
                  src={IMDB_img}
                  width={"40px"}
                  style={{ marginRight: "10px" }}
                ></img>{" "}
                {IMDB.imdbRating} ({IMDB.imdbVotes})
              </h6>
            ) : null}
            {IMDB.Ratings.find((rating) => rating.Source === "Rotten Tomatoes")
              ?.Value ? (
              <h6
                style={{
                  fontSize: "12px",
                  display: "flex",
                  alignContent: "center",
                  marginTop: "5px",
                }}
              >
                <img
                  src={Tomato_img}
                  width={"20px"}
                  style={{ marginRight: "10px" }}
                ></img>{" "}
                {
                  IMDB.Ratings.find(
                    (rating) => rating.Source === "Rotten Tomatoes"
                  )?.Value
                }
              </h6>
            ) : null}
          </>
        )}
      </div>
      <ShowGenre id={props.id} />
    </div>
  );
}


export default SuggetionTilsHover;
