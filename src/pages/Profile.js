import React, {useState} from 'react'
import FavoriteMovies from '../components/FavoriteMovies'
import '../pages/Profile.css'
import useUser from '../context/useUser';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Profile() {
  const { user, signOut } = useUser();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;


  const [showConfirmation, setShowConfirmation] = useState(false);


  const handleDeleteAccount = async () => {
    
      try {
        const token = sessionStorage.getItem('token'); // Get JWT token for authorization
        const headers = { headers: { Authorization: `Bearer ${token}` } };

        await axios.delete(url + '/user/delete', { data: { id: user.id }, ...headers });
        setShowConfirmation(false);
        signOut();
        navigate("/signin"); 

      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
      }
    
  };


  return (
    <div class="page-container">
      <div style={{textAlign: 'center'}}>
        
        <h1>User Profile</h1>
        <img src={require('../assets/User_image.png')} alt="User" />

        <h2>Welcome to your profile page!</h2>
      </div>


      <div className="username">
        {/* add a separate font for following username */}
        <h3>Username :   { user?.username || 'Not available'}</h3>
        <h3>Email :   { user?.email || 'Not available'}</h3>
      </div>

      <div class = "User_favoriteList">
        <h2>My Favorite Movies</h2>
        <FavoriteMovies />
      </div>

      <div class = "User_Groups">
        <h2>My Groups</h2>
        <div class="group">
          <p>Group 1</p>
          <p>Group 2</p>
        </div>

      </div>

      <div className="Account_delete">
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete your account?</p>
        <button className="confirm-button" onClick={() => setShowConfirmation(true)}>Delete Account</button>
      </div>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleDeleteAccount}>
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={() => setShowConfirmation(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}
