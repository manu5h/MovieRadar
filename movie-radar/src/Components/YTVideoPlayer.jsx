import React, { useState, useEffect } from "react";
import axios from "axios";

const YouTubeVideo = ({ movieId }) => {
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const TMDB_APIKey = "3e19ed027343875b8ea3f3d64a77a190";
      const Trailer_URL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_APIKey}`;

      try {
        const response = await axios.get(Trailer_URL);

        const trailer = response.data.results.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube" &&
            video.official === true
        );

        if (trailer) {
          setVideoId(trailer.key); // YouTube video key
          setError(null);
        } else {
          setError(
            ":( No official trailer available for this movie (according to TMDB)."
          );
        }
      } catch (error) {
        console.error("TMDB API error:", error);
        setError("Failed to fetch trailer.");
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {videoId ? (
        <iframe
          className="yt-frame"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default YouTubeVideo;
