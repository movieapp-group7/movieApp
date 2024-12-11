import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useUser from '../context/useUser';
import './WatchListPage.css';

const url = process.env.REACT_APP_API_URL;

const WatchlistPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [currentlyWatching, setCurrentlyWatching] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('currently_watching');

  useEffect(() => {
    fetchWatchlist();
  }, [id]);

  const fetchWatchlist = async () => {
    try {
      const [currentlyWatchingRes, toWatchRes, completedRes] = await Promise.all([
        axios.get(`${url}/watch/watchlist/${id}/currently_watching`),
        axios.get(`${url}/watch/watchlist/${id}/to_watch`),
        axios.get(`${url}/watch/watchlist/${id}/completed`),
      ]);

      setCurrentlyWatching(currentlyWatchingRes.data);
      setToWatch(toWatchRes.data);
      setCompleted(completedRes.data);

      await fetchMovieDetails(currentlyWatchingRes.data, 'currently_watching');
      await fetchMovieDetails(toWatchRes.data, 'to_watch');
      await fetchMovieDetails(completedRes.data, 'completed');
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      alert('Failed to fetch watchlist.');
    }
  };

  const fetchMovieDetails = async (watchlist, listType) => {
    try {
      const moviePromises = watchlist
        .map((movie) => {
          const movieId = movie.movie_id;
          if (!movieId) {
            console.warn(`Missing movie_id for movie:`, movie);
            return null;
          }
          return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=54c539f0a2dca863d152652c08d28924`);
        })
        .filter(Boolean);

      const movieResponses = await Promise.all(moviePromises);

      const movieData = movieResponses.map((res, index) => ({
        ...res.data,
        movieId: watchlist[index].movie_id,
      }));

      setMovieDetails((prevState) => ({
        ...prevState,
        [listType]: movieData,
      }));
    } catch (error) {
      console.error('Error fetching movie details:', error);
      alert('Failed to fetch movie details.');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderMovies = (movies) => {
    return movies.map((movie) => (
      <li className="watchlist-item" key={movie.movieId}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="watchlist-movie-poster"
        />
        <div className="watchlist-item-content">
          <p className="watchlist-movie-title">{movie.title}</p>
          <p className="watchlist-movie-details">{movie.overview}</p>
          <span>Release Date: {movie.release_date}</span>
        </div>
        <button
          className="watchlist-remove-btn"
          onClick={() => handleRemove(movie.movieId)}
        >
          Remove
        </button>
      </li>
    ));
  };

  const handleRemove = async (movieId) => {
    try {
      await axios.delete(`${url}/watchlist/${id}/movie/${movieId}`);
      fetchWatchlist(); // Refresh the list after removal
    } catch (error) {
      console.error('Error removing movie:', error);
      alert('Failed to remove movie.');
    }
  };

  return (
    <div className="watchlist-container">
      <h1>{user.username}'s Watchlist</h1>

      {/* Tabs for each category */}
      <div className="watchlist-tabs">
        <button
          className={`watchlist-tab ${activeTab === 'currently_watching' ? 'active' : ''}`}
          onClick={() => handleTabClick('currently_watching')}
        >
          Currently Watching
        </button>
        <button
          className={`watchlist-tab ${activeTab === 'to_watch' ? 'active' : ''}`}
          onClick={() => handleTabClick('to_watch')}
        >
          To Watch
        </button>
        <button
          className={`watchlist-tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => handleTabClick('completed')}
        >
          Completed
        </button>
      </div>

      {/* Display movies based on active tab */}
      <div className="watchlist-content">
        {activeTab === 'currently_watching' && (
          <ul className="watchlist-list">
            {currentlyWatching.length > 0
              ? renderMovies(movieDetails.currently_watching || [])
              : <p>No movies in this list.</p>}
          </ul>
        )}
        {activeTab === 'to_watch' && (
          <ul className="watchlist-list">
            {toWatch.length > 0
              ? renderMovies(movieDetails.to_watch || [])
              : <p>No movies in this list.</p>}
          </ul>
        )}
        {activeTab === 'completed' && (
          <ul className="watchlist-list">
            {completed.length > 0
              ? renderMovies(movieDetails.completed || [])
              : <p>No movies in this list.</p>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
