import React from "react";
import "../Style/Search.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search() {
  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Search Movies by Title, Year, or Cast"
        />
        <button type="submit" className="searchButton">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}

export default Search;
