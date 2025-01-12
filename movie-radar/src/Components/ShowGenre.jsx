import React, { useEffect, useState } from "react";
import API_ENDPOINT from "../../Config";
//Additional_first_page

function ShowGenre(props) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);

  const GENRES_WITH_COLORS = [
    { id: 28, name: "Action", color: "#FF5733", textColor: "#FFFFFF" }, // Vibrant Red-Orange with White text
    { id: 12, name: "Adventure", color: "#FFC300", textColor: "#4B4B4B" }, // Golden Yellow with Dark Gray text
    { id: 16, name: "Animation", color: "#DAF7A6", textColor: "#2C5F2D" }, // Soft Green with Dark Green text
    { id: 35, name: "Comedy", color: "#FFC0CB", textColor: "#822D41" }, // Light Pink with Soft Maroon text
    { id: 80, name: "Crime", color: "#6C3483", textColor: "#E1D3EE" }, // Deep Purple with Light Lavender text
    { id: 99, name: "Documentary", color: "#3498DB", textColor: "#EAF5FB" }, // Sky Blue with Light Cyan text
    { id: 18, name: "Drama", color: "#1F618D", textColor: "#D6EAF8" }, // Dark Blue with Soft Blue text
    { id: 10751, name: "Family", color: "#58D68D", textColor: "#155724" }, // Fresh Green with Deep Green text
    { id: 14, name: "Fantasy", color: "#AF7AC5", textColor: "#FDF3FE" }, // Lavender Purple with Soft Pink text
    { id: 36, name: "History", color: "#A04000", textColor: "#FDEDEC" }, // Rich Brown with Pale Peach text
    { id: 27, name: "Horror", color: "#900C3F", textColor: "#FADBD8" }, // Blood Red with Pale Pink text
    { id: 10402, name: "Music", color: "#F7DC6F", textColor: "#5A4A0A" }, // Soft Yellow with Golden Brown text
    { id: 9648, name: "Mystery", color: "#566573", textColor: "#D5DBDB" }, // Charcoal Gray with Pale Gray text
    { id: 10749, name: "Romance", color: "#FF69B4", textColor: "#5C0031" }, // Hot Pink with Deep Plum text
    { id: 878, name: "Sci-fi", color: "#16A085", textColor: "#D5F5E3" }, // Teal with Soft Mint text
    { id: 10770, name: "TV", color: "#F39C12", textColor: "#4B3A04" }, // Orange with Dark Brown text
    { id: 53, name: "Thriller", color: "#C0392B", textColor: "#FDEDEC" }, // Crimson with Pale Peach text
    { id: 10752, name: "War", color: "#626567", textColor: "#D5D8DC" }, // Gunmetal Gray with Light Gray text
    { id: 37, name: "Western", color: "#D35400", textColor: "#FDEDEC" }, // Burnt Orange with Pale Peach text
  ];
  
  

  useEffect(() => {
    fetch(API_ENDPOINT.Additional_first_page.replace(":id", props.id))
      .then((Response) => {
        if (!Response.ok) {
          throw new Error("Network response was not ok");
        }
        return Response.json();
      })
      .then((data) => {
        setData(data);
        if (data.genres && Array.isArray(data.genres)) {
          const genreIDs = data.genres.map((genre) => genre.id);
          setGenres(genreIDs);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [props.id]);

  function GenreDiv() {
    return genres
      .map((genreId) => {
        const matchedGenre = GENRES_WITH_COLORS.find(
          (genre) => genre.id === genreId
        );
        if (matchedGenre) {
          return (
            <div
              key={matchedGenre.id}
              style={{
                backgroundColor: matchedGenre.color,
                width: `${10* matchedGenre.name.length}px`,
                padding: "2px",
                margin: "2px",
                borderRadius: "5px",
                color: `${matchedGenre.textColor}`,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h5>{matchedGenre.name}</h5>
            </div>
          );
        }
        return null;
      })
      .filter(Boolean);
  }

  return (
    <div style={{ flexWrap: "wrap", display: "flex", width: "180px", margin: "2px 0 0 10px"}}>
      <GenreDiv />
    </div>
  );
}

export default ShowGenre;
