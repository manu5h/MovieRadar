import { useState, useEffect, useContext } from "react";
import API_ENDPOINT from "../../Config";
import "../Style/WebDecsription.css";
import ThemeContext from "./Theme";
import Search from "./Search";

function WebDescription({ children, enableSearch }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [day, setDay] = useState(0);
  const today = new Date();
  const dayAsInt = today.getDay();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    // Fetch data only once
    fetch(API_ENDPOINT.Top_Picks)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (data) {
      let currentDay = dayAsInt;
      while (
        !data.results[currentDay]?.backdrop_path &&
        currentDay < data.results.length
      ) {
        currentDay = (currentDay + 1) % 7;
      }

      setDay(currentDay);
    }
  }, [data, dayAsInt]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="Description-main-div"
      style={{
        backgroundImage:
          data && data.results[day]?.backdrop_path
            ? `linear-gradient(rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0.5)), url(${API_ENDPOINT.IMG_URL_Full_Res}${data.results[day].backdrop_path})`
            : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
      <h1 className="flare-heading">
        Lights, camera, action! Start exploring now!
      </h1>
      <h3 className="flare-subheading">
        Your ultimate movie guide, all in one place
      </h3>
      {enableSearch ? <Search /> : null}
    </div>
  );
}

export default WebDescription;
