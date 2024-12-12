// FavoriteButton.js

import React, { useState, useEffect } from 'react';
import useUser from '../context/useUser';
import './FavoriteButton.css';

const url = process.env.REACT_APP_API_URL

const FavoriteButton = ({ movieId }) => {
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(false); 

  // check favorite state:
  useEffect(() => {

    if (!user.id) {
      setIsFavorite(false); 
      return;
    }

    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(`${url}/movie/favorites/${user.id}/${movieId}`);
        const data = await response.json();
        console.log(data)
        
        if (data.isFavorite) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error fetching favorite status:', error);
      }
    };

    fetchFavoriteStatus();
  }, [movieId,user.id]);

  const handleFavoriteClick = async () => {
    //check login
    if (!user.id) {
      alert("Please log in to add movies to your favorites.");
      return;
    }
    //post data to API
    try{
      const response = await fetch(url + "/movie/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: user.id,
          movieId: movieId,
          favorite: !isFavorite,
        }),
      });
      const data = await response.json();
  
      if (data.success) {
        setIsFavorite(!isFavorite); 
      } else {
        console.error('Failed to update favorite status:', data.status_message);
      }
    } catch (error) {
        console.error('Error updating favorite status:', error);
      }
    };
  
    return (
      <button className="favorite-button" onClick={handleFavoriteClick}>
        <p className={`heart-icon ${isFavorite ? 'favorite' : ''}`}>&#9829;
      </button>
    );
  };

export default FavoriteButton;




