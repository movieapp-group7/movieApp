import React, { useState, useEffect } from 'react';
import useUser from '../context/useUser';
import axios from 'axios';
//import MovieList from './MovieList';
import MyFavoritesList from './MyFavoritesList';

const url = process.env.REACT_APP_API_URL

const FavoriteMovies= () => {
  const { user } = useUser();
  const [movies, setMovies] = useState([]); 

  // fetch data
  const fetchFavoriteMovies = async () => {
    try {
      // const response = await fetch(url, options);
      const favoriteResponse = await fetch(`${url}/movie/favorites/${user.id}`);
      const favoriteData = await favoriteResponse.json();
      console.log(favoriteData)
      
      const movieIds = favoriteData.map((item) => item.movie_id);
      console.log(movieIds)
    //get favorite movie data from TMDB
    const moviePromises = movieIds.map(async(movieId) =>{
      try {
        // get movie details
        const movieDetails = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=54c539f0a2dca863d152652c08d28924`
        );

        // get average rating
        const averageRatingResponse = await axios.get(
          `${url}/movie/${movieId}/rating`
        );
        const averageRating =
          averageRatingResponse.data[0]?.averagerating || "N/A";

        //combine
        return {
          ...movieDetails.data,
          averageRating,
        };
      } catch (error) {
        console.error(`Error fetching data for movie ID ${movieId}:`, error);
        return null;
      }
    });

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
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MyFavoritesList key={movie.id} movie={movie} />
        ))
      ) : (
        <p>No favorite movies available.</p>
      )}
    </div>
  );
};

export default FavoriteMovies;