import { useContext, useEffect, useState, useRef } from "react";
import API_ENDPOINT from "../../Config";
import IMDB_img from "../assets/IMDB_Logo.png";
import Tomato_img from "../assets/Rotten_Tomatoes.svg.png";
import ShowGenre from "./ShowGenre";

function SuggetionTilsHover(props) {
  const [data, setData] = useState(null);
  const [IMDB, setIMDB] = useState(null);
  let lan = "";
  switch (props.lan) {
    case "en":
      lan = "English";
      break;
    case "es":
      lan = "Spanish";
      break;
    case "fr":
      lan = "French";
      break;
    case "de":
      lan = "German";
      break;
    case "zh":
      lan = "Chinese";
      break;
    case "hi":
      lan = "Hindi";
      break;
    case "ta":
      lan = "Tamil";
      break;
    case "te":
      lan = "Telugu";
      break;
    case "ml":
      lan = "Malayalam";
      break;
    case "kn":
      lan = "Kannada";
      break;
    case "bn":
      lan = "Bengali";
      break;
    case "gu":
      lan = "Gujarati";
      break;
    case "mr":
      lan = "Marathi";
      break;
    case "pa":
      lan = "Punjabi";
      break;
    case "ur":
      lan = "Urdu";
      break;
    case "ru":
      lan = "Russian";
      break;
    case "ja":
      lan = "Japanese";
      break;
    case "ko":
      lan = "Korean";
      break;
    case "it":
      lan = "Italian";
      break;
    case "pt":
      lan = "Portuguese";
      break;
    case "ar":
      lan = "Arabic";
      break;
    case "tr":
      lan = "Turkish";
      break;
    case "vi":
      lan = "Vietnamese";
      break;
    case "th":
      lan = "Thai";
      break;
    case "pl":
      lan = "Polish";
      break;
    case "id":
      lan = "Indonesian";
      break;
    case "nl":
      lan = "Dutch";
      break;
    case "sv":
      lan = "Swedish";
      break;
    case "no":
      lan = "Norwegian";
      break;
    case "da":
      lan = "Danish";
      break;
    case "si":
      lan = "Sinhala";
      break;
    default:
      lan = "N/A";
  }
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
