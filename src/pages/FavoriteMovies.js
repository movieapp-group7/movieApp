import React, { useState, useEffect } from 'react';
import useUser from '../context/useUser';
import MovieList from '../components/MovieList';

const url = process.env.REACT_APP_API_URL

const FavoriteMovies= () => {
  const { user } = useUser();
  const [movies, setMovies] = useState([]); 

  // fetch data
  const fetchFavoriteMovies = async () => {

   //from backend
    try {
      // const response = await fetch(url, options);
      const favoriteResponse = await fetch(`${url}/movie/favorites/${user.id}`);
      const favoriteData = await favoriteResponse.json();
      console.log(favoriteData)
      
      const movieIds = favoriteData.map((item) => item.movie_id);
      console.log(movieIds)
    //get favorite movie data from TMDB
    const moviePromises = movieIds.map((movieId) =>
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=54c539f0a2dca863d152652c08d28924`)
        .then((response) => response.json())
        .catch((error) => {
          console.error(`Failed to fetch details for movie ID ${movieId}:`, error);
          return null; // Return null to filter out failed fetches
        })
    );

    const data = await Promise.all(moviePromises);
    setMovies(data.filter((movie) => movie !== null));
    console.log(movies)
    } catch (error) {
      console.error('Failed to fetch favorite movies:', error);
    }
  };

  
  useEffect(() => {
    fetchFavoriteMovies();
  },[user.id]);

  return (
    <div>
    
      <MovieList movies={movies} />
    </div>
  );
};

export default FavoriteMovies;