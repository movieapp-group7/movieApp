import React from 'react';
import axios from 'axios';
import './WatchListButton.css';

const WatchListButton = ({ movieId, userId }) => {
  const handleAddToWatchlist = async () => {
    if (!userId) {
      alert('Please log in to add this movie to your watchlist.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/watchlist`, {
        userId,
        contentId: movieId,
        status: 'to_watch', // Default status or modify as needed
      });

      if (response.status === 200) {
        alert('Movie added to your watchlist successfully!');
      }
    } catch (error) {
      console.error('Failed to add movie to watchlist:', error);
      alert('Failed to add movie to watchlist. Please try again.');
    }
  };

  return (
    <button className="watchlist-button" onClick={handleAddToWatchlist}>
      Add to Watchlist
    </button>
  );
};

export default WatchListButton;
