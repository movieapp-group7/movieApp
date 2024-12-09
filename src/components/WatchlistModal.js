
import React, { useState } from 'react';
import axios from 'axios';
import useUser from '../context/useUser';
import './WatchlistModal.css';

const WatchlistModal = ({ movie, onClose }) => {
  const { user } = useUser();
  const [status, setStatus] = useState(''); // 'currently_watching', 'to_watch', 'completed'
  const [error, setError] = useState(null);

  const handleAddToWatchlist = async () => {
    if (!user) {
      setError('User not found. Please log in.');
      return;
    }

    if (!status) {
      setError('Please select a status for the movie.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/watchlist`, {
        userId: user.id,
        contentId: movie.id, 
        status: status,
      });

      if (response.status === 200) {
        alert('Movie added to watchlist successfully!');
        onClose(); // Close the modal on success
      }
    } catch (err) {
      console.error('Failed to add movie to watchlist:', err);
      setError('Failed to add movie to watchlist. Please try again.');
    }
  };

  return (
    <div className="watchlist-modal">
      <div className="modal-content">
        <h2>Add to Your Watchlist</h2>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select a status</option>
          <option value="currently_watching">Currently Watching</option>
          <option value="to_watch">To Watch</option>
          <option value="completed">Completed</option>
        </select>

        {error && <p className="error-message">{error}</p>}

        <div className="modal-actions">
          <button className="add-button" onClick={handleAddToWatchlist} disabled={!status || !user}>
            Add to Watchlist
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchlistModal;
