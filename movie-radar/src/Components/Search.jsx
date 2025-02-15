import React, { useState } from "react";
import "../Style/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchModel from "./SearchModel";
import API_ENDPOINT from "../../Config";

function Search( props ) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Find Your Next Favorite Movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="searchButton" onClick={handleSubmit}>
          {searchTerm ? (
            <FontAwesomeIcon icon={faClose} onClick={()=>{setSearchTerm("")}}/>
          ) : (
            <FontAwesomeIcon icon={faSearch} />
          )}
        </button>
      </div>

      {searchTerm && <SearchModel keyWord={searchTerm} API={API_ENDPOINT.Search_URL}/>}
    </div>
  );
}

export default Search;
