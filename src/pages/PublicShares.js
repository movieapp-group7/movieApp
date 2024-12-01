import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList';

const url = process.env.REACT_APP_API_URL

const PublicShares= () => {
  const { shareUrl } = useParams();
  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(null);
  const [favoriteInfo,setFavoriteInfo] = useState('')

  // fetch data
  const fetchPublucFavoriteMovies = async () => {
    /*const url = "https://api.themoviedb.org/3/account/21613810/favorite/movies?api_key=54c539f0a2dca863d152652c08d28924&session_id=df14e615c6e8a37fc3396968bdc758d8c1e051a0";
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGM1MzlmMGEyZGNhODYzZDE1MjY1MmMwOGQyODkyNCIsIm5iZiI6MTczMDkzMzU5Ny4wNDU3NjksInN1YiI6IjY3MmIwY2VlMmY2NGViZThjOGU0ZGVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6pw2lCXSmmNW75P1F8EVCq-dMxYpyPwn2QcF3f7PV7Y', 
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };*/

   //from backend
    try {
      // const response = await fetch(url, options);
      const favoriteResponse = await fetch(`${url}/user/share/public/${shareUrl}`);
      const favoriteData = await favoriteResponse.json();
      setFavoriteInfo(favoriteData)
      console.log(favoriteData.favorites)
      
      const movieIds = favoriteData.favorites.map((item) => item.movie_id);
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
    fetchPublucFavoriteMovies();
  },[shareUrl]);

  return (
    <div>
      <h2>{favoriteInfo.email}'s Favorite List</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default PublicShares;