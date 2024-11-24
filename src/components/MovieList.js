import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieList.css';

const MovieList = ({ movies }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate('/movies/'+ movieId);
  };
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie, index) => (
          <div 
            key={index} 
            className="movie-card" 
            onClick={() => handleMovieClick(movie.id)}
          >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} className="movielist-image" />
            <h2>{movie.original_title}</h2>
            </div>
        ))
      ) : (
           <p>No movies found</p>
          )}
    </div>
  );
};

export default MovieList;
