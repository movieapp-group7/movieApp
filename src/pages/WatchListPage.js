import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WatchlistPage = ({ accountId }) => {
  const [currentlyWatching, setCurrentlyWatching] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [activeTab, setActiveTab] = useState('currentlyWatching'); // Track which tab is active

  useEffect(() => {
    // Fetch watchlist by status
    const fetchWatchlist = async () => {
      try {
        const [currentlyWatchingRes, toWatchRes, completedRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/watchlist/${accountId}/status/currently_watching`),
          axios.get(`http://localhost:3001/api/watchlist/${accountId}/status/to_watch`),
          axios.get(`http://localhost:3001/api/watchlist/${accountId}/status/completed`),
        ]);
        setCurrentlyWatching(currentlyWatchingRes.data);
        setToWatch(toWatchRes.data);
        setCompleted(completedRes.data);
      } catch (error) {
        console.error('Error fetching watchlist', error);
      }
    };

    fetchWatchlist();
  }, [accountId]);

  return (
    <div>
      <h1>My Watchlist</h1>

      {/* Tab Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('currentlyWatching')}>Currently Watching</button>
        <button onClick={() => setActiveTab('toWatch')}>To Watch</button>
        <button onClick={() => setActiveTab('completed')}>Completed</button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'currentlyWatching' && (
          <div>
            <h2>Currently Watching</h2>
            <ul>
              {currentlyWatching.length > 0 ? (
                currentlyWatching.map(movie => (
                  <li key={movie.movie_id}>{movie.movie_id}</li> // Replace with actual movie details
                ))
              ) : (
                <p>No movies in this category.</p>
              )}
            </ul>
          </div>
        )}

        {activeTab === 'toWatch' && (
          <div>
            <h2>To Watch</h2>
            <ul>
              {toWatch.length > 0 ? (
                toWatch.map(movie => (
                  <li key={movie.movie_id}>{movie.movie_id}</li> // Replace with actual movie details
                ))
              ) : (
                <p>No movies in this category.</p>
              )}
            </ul>
          </div>
        )}

        {activeTab === 'completed' && (
          <div>
            <h2>Completed</h2>
            <ul>
              {completed.length > 0 ? (
                completed.map(movie => (
                  <li key={movie.movie_id}>{movie.movie_id}</li> // Replace with actual movie details
                ))
              ) : (
                <p>No movies in this category.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;
