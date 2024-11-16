import React, { useState, useEffect } from 'react';

const ShowTimesFinnkino = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the Finnkino API
    const apiUrl = "https://www.finnkino.fi/xml/Schedule";

    fetch(apiUrl)
      .then((response) => response.text()) // Convert to XML text
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        
        if (xml.querySelector("parsererror")) {
          throw new Error("Error parsing XML");
        }

        const shows = xml.getElementsByTagName("Show");
        const moviesList = [];
        
        for (const show of shows) {
          const title = show.querySelector("Title")?.textContent;
          const showTime = show.querySelector("dttmShowStart")?.textContent;
          const theatre = show.querySelector("Theatre")?.textContent;

          if (title && showTime && theatre) {
            moviesList.push({ title, showTime, theatre });
          }
        }

        setMovies(moviesList);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Movie Schedule</h2>
      <ul>
        {movies.map((movie, index) => (
          <li key={index}>
            <strong>{movie.title}</strong> - {movie.showTime} at {movie.theatre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowTimesFinnkino;
