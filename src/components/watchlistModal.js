import React, { useState } from 'react';
import useUser from '../context/useUser';
import './watchlistModal.css';

const url = process.env.REACT_APP_API_URL;

const WatchlistModal = ({ isOpen, onClose, movieId, movieTitle }) => {
  const { user } = useUser();
  const [newMovieStatus, setNewMovieStatus] = useState('To Watch');

  // Add Movie
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add movie to watchlist');
      }

      const data = await response.json();

      if (data.success) {
        alert(`Movie '${movieTitle}' added to your watchlist as ${newMovieStatus}`);
        onClose(); 
      }
    } catch (error) {
      // No console.error, just show a basic alert
      alert('Error adding movie to watchlist: ' + error.message);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="xleft">
        <button className="close-btn" onClick={handleClose}>&#10005;</button>
        </div>
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
        <div>
          <button className="add-movie-btn" onClick={handleAddMovie}>Add to Watchlist</button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistModal;
