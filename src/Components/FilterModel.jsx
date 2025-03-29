import React, { useState } from "react";
import "../Style/Filter.css";
import API_ENDPOINT, { TMDB_APIKey } from "../../Config";

function FilterModel({ onClose, SearchAPI, selectedFilters, updatePageCount }) {
  const [filters, setFilters] = useState({
    genre: "",
    language: "",
  });

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "hi", name: "Hindi" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "ml", name: "Malayalam" },
    { code: "kn", name: "Kannada" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ar", name: "Arabic" },
    { code: "pt", name: "Portuguese" },
    { code: "si", name: "Sinhala" },
  ];

  const buildFilterQuery = (filters) => {
    let query = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_APIKey}&include_adult=false`;

    if (filters.genre) {
      query += `&with_genres=${filters.genre}`;
    }
    if (filters.language) {
      query += `&with_original_language=${filters.language}`;
    }

    return query;
  };

  const handleSearch = () => {
    const query = buildFilterQuery(filters);

    // Fetch total pages from the API
    fetch(`${query}&page=500`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data from TMDB");
        }
        return response.json();
      })
      .then((data) => {
        const totalPages = data.total_pages; // Extract total pages
        updatePageCount(totalPages); // Send total pages to the parent

        // Trigger the search API in the parent
        API_ENDPOINT.Search_URL = query;
        SearchAPI(query);

        // Find selected genre and language names
        const selectedGenre =
          genres.find((genre) => genre.id === filters.genre)?.name || "";
        const selectedLanguage =
          languages.find((lang) => lang.code === filters.language)?.name || "";

        // Update selected filters in the parent
        selectedFilters({
          genre: selectedGenre,
          language: selectedLanguage,
        });

        onClose(); // Close the filter modal
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type] === value ? "" : value,
    }));
  };

  const isApplyButtonDisabled = !filters.genre && !filters.language;

  return (
    <div className="filter-model-overlay">
      <div className="filter-model-container">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        <h2>Filter Movies</h2>

        {/* Genre Filters */}
        <div className="filter-group">
          <h3>Genre</h3>
          <div className="filter-buttons">
            {genres.map((genre) => (
              <button
                key={genre.id}
                className={`filter-button ${
                  filters.genre === genre.id ? "selected" : ""
                }`}
                onClick={() => handleInputChange("genre", genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Language Filters */}
        <div className="filter-group">
          <h3>Language</h3>
          <div className="filter-buttons">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`filter-button ${
                  filters.language === lang.code ? "selected" : ""
                }`}
                onClick={() => handleInputChange("language", lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`apply-button ${isApplyButtonDisabled ? "disabled" : ""}`}
          onClick={handleSearch}
          disabled={isApplyButtonDisabled}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterModel;
