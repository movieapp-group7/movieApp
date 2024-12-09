// src/context/WatchlistContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // or your preferred method for fetching data

// Create the context
const WatchlistContext = createContext();

// Provider component to wrap around your app
export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState({
    currentlyWatching: [],
    toWatch: [],
    completed: []
  });

  // Fetch the watchlist movies from the backend
  const fetchWatchlist = async () => {
    try {
      const { data } = await axios.get('/api/watchlist'); // Modify with the correct endpoint
      setWatchlist({
        currentlyWatching: data.currentlyWatching,
        toWatch: data.toWatch,
        completed: data.completed
      });
    } catch (error) {
      console.error("Failed to fetch watchlist data", error);
    }
  };

  // Update the status of a movie (e.g., from To Watch to Currently Watching)
  const updateMovieStatus = (movieId, newStatus) => {
    setWatchlist((prevState) => {
      // Update the movie status in the appropriate list
      const updatedLists = { ...prevState };
      // Logic to move the movie to the correct section
      Object.keys(updatedLists).forEach((status) => {
        updatedLists[status] = updatedLists[status].map((movie) => {
          if (movie.id === movieId) {
            return { ...movie, status: newStatus };
          }
          return movie;
        });
      });
      return updatedLists;
    });
  };

  const addMovieToWatchlist = (newMovie, status) => {
    setWatchlist((prevState) => {
      const updatedLists = { ...prevState };
      updatedLists[status].push(newMovie);
      return updatedLists;
    });
  };

  // Remove a movie from the watchlist
  const removeMovieFromWatchlist = (movieId) => {
    setWatchlist((prevState) => {
      const updatedLists = { ...prevState };
      Object.keys(updatedLists).forEach((status) => {
        updatedLists[status] = updatedLists[status].filter(movie => movie.id !== movieId);
      });
      return updatedLists;
    });
  };

  // Call fetchWatchlist when the component mounts
  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addMovieToWatchlist,
      updateMovieStatus,
      removeMovieFromWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};

// Custom hook to access the watchlist context
export const useWatchlist = () => {
  return useContext(WatchlistContext);
};
