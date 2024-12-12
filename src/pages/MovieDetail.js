// src/screens/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';
import axios from 'axios';
import star from "../assets/star.svg"
import useUser from '../context/useUser';
import MovieReviewsList from '../components/MovieReviewsList';
import FavoriteButton from '../components/FavoriteBotton';
import ReviewForm from '../components/ReviewForm';
import GroupSelectionModal from '../components/GroupSelection';
import RecommendMovies from '../components/RecommendMovies';
import WatchlistModal from '../components/watchlistModal'


const MovieDetail = () => {
  const { movieId } = useParams();
  const { user } = useUser();
  const [movie, setMovie] = useState({});
  const [reviews,setReviews]=useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [averageRating,setAverageRating] = useState('')
  const [showGroup, setShowGroup] = useState(false);
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);

  // fetch data
  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGM1MzlmMGEyZGNhODYzZDE1MjY1MmMwOGQyODkyNCIsIm5iZiI6MTczMDkzMzU5Ny4wNDU3NjksInN1YiI6IjY3MmIwY2VlMmY2NGViZThjOGU0ZGVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6pw2lCXSmmNW75P1F8EVCq-dMxYpyPwn2QcF3f7PV7Y', 
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  //get reviews by movieId from database
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/movie/${movieId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/movie/${movieId}/rating`);
      setAverageRating(response.data[0].averagerating);
      console.log(response.data[0].averagerating)
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  }

  const handleAddToGroup = (movie) => {
    setShowGroup(true); 
  };

  const handleAddToWatchlist = () => {
    setShowWatchlistModal(true);
  };

  const handleCloseWatchlistModal = () => {
    setShowWatchlistModal(false);
  };

  const addReview = (newReview) => {
    setReviews((prevReviews) => [newReview,...prevReviews]);
    const updatedReviews = [newReview, ...reviews];
    const totalRating = updatedReviews.reduce((acc, review) => acc + parseFloat(review.rating), 0);
    const newAverageRating = (totalRating / updatedReviews.length).toFixed(1);
    setAverageRating(newAverageRating);
  };

  useEffect(() => {
    fetchMovies();
    fetchReviews();
    fetchAverageRating();
  }, [movieId,user]);

  console.log(movie)
  console.log(movie.genres)

  return (
    <div className="movie-detail">
      <div className="movie-backdrop">
        <div className="movie-title">
          <h1>{movie.title}</h1>
          <p className="movie-tagline">{movie.tagline}</p>
        </div>
      </div>

      <div className="movie-info">
        <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

        <div className="movie-details">
          {/* genres */} 
          <div className="genre-tags">
            {movie.genres && movie.genres.map((genre) => (
              <span key={genre.id} className={`genre-tag genre-${genre.id}`}>
                {genre.name}
              </span>
            ))}
          </div>

          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          
          {/* <p><strong>Languages:</strong> {movie.spoken_languages.map(lang => lang.english_name).join(', ')}</p> */}
         
          <span className="average-rating">  {averageRating} / 5.0</span>
          <FavoriteButton movieId={movieId} />
          <p><a href={movie.homepage} target="_blank" rel="noopener noreferrer">Visit Official Website</a></p>
          <button className='add-group-button' onClick={() => handleAddToGroup(movie)}>Add to group</button>
          <button className='add-group-button' onClick={ handleAddToWatchlist}>Add to Watchlist</button>
        </div>
      </div>

      
      {/* add to group */}
      
      {showGroup && (
        <GroupSelectionModal
          movie={movie}
          onClose={() => setShowGroup(false)}
        />
      )}

      {showWatchlistModal && (
          <WatchlistModal
            isOpen={showWatchlistModal} // Control visibility of modal
            onClose={handleCloseWatchlistModal} // Handle close
            movieId={movie.id}  // Pass the movieId here
            movieTitle={movie.title}  // Pass the movieTitle here
              />
            )}

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Reviews</h2>
          <button className="add-review-btn" onClick={() => user.id? setShowReviewForm(true) : alert("Please log in to add a review.")}> Add Review </button>
        </div>

        {showReviewForm && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setShowReviewForm(false)}
            >
              ×
            </button>
            <ReviewForm
              movieId={movieId}
              addReview={addReview}
              closeForm={() => setShowReviewForm(false)}
            />
          </div>
        </div>
      )}
        <MovieReviewsList reviews={reviews} />
      </div>

       {/* recommendation */}
       {movie.genres&&(<RecommendMovies genres={movie.genres} />)}

    </div>
  );
};

export default MovieDetail;
