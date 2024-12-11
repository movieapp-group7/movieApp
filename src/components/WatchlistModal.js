import React, { useState } from 'react';
import useUser from '../context/useUser';
import './WatchlistModal.css';

const url = process.env.REACT_APP_API_URL;

const WatchlistModal = ({ isOpen, onClose, movieId, movieTitle }) => {
  const { user } = useUser();
  const [newMovieStatus, setNewMovieStatus] = useState('To Watch'); // Default status for new movie

  console.log(movieId, movieTitle); // You can check if the movieId and movieTitle are passed correctly

  // Handle adding a new movie to the watchlist
  const handleAddMovie = async () => {
    if (!user.id) {
      alert("Please log in to add movies to your watchlist.");
      return;
    }
  
    if (!movieId) {
      alert("Invalid movie ID.");
      return;
    }

    const statusMap = {
      'To Watch': 'to_watch',
      'Currently Watching': 'currently_watching',
      'Completed': 'completed',
    };

    const backendStatus = statusMap[newMovieStatus]; 
  
    // Use the accountId (user.id) in the URL
    try {
      const response = await fetch(`${url}/watch/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: user.id,
          movieId: movieId,
          status: backendStatus,
        }),
      });

      // Check if the response is successful (status code 2xx)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add movie to watchlist');
      }

      const data = await response.json();

      // Check if the backend response indicates success
      if (data.success) {
        alert(`Movie '${movieTitle}' added to your watchlist as ${newMovieStatus}`);
        onClose(); // Close modal after adding movie
      } else {
        // If the success flag is not true, log the failure reason
        console.error('Failed to add movie to watchlist:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding movie to watchlist:', error.message);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>&#10005;</button>
        <h2>Add "{movieTitle}" to Your Watchlist</h2>
        <div className="status-selection">
          <label>
            Select Status:
            <select
              value={newMovieStatus}
              onChange={(e) => setNewMovieStatus(e.target.value)}
            >
              <option value="To Watch">To Watch</option>
              <option value="Currently Watching">Currently Watching</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </div>
        <div className="add-movie-btn">
          <button onClick={handleAddMovie}>Add to Watchlist</button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistModal;
