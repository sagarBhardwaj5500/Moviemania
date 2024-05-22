import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import axios from "axios";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a"; // Changed to HTTPS

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    try {
      const resp = await axios.get(`${API_URL}&s=${title}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = resp.data.Search;
      setMovies(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="app">
      <h1>MovieMania</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
