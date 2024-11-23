import React from 'react'
import FavoriteMovies from '../components/FavoriteMovies'
import '../pages/Profile.css'

export default function Profile() {
  return (
    <div class="page-container">
      <div style={{textAlign: 'center'}}>
        
        <h1>User Profile</h1>
        <img src={require('../assets/User_image.png')} alt="User" />

        <h2>Welcome to your profile page!</h2>
      </div>


      <div class="username">
  
        <h3>Username: username</h3>
        <h3>Email: email</h3>
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

      <div class = "Account_delete">
        <h2>Delete Account </h2>
        <p>Are you sure you want to delete your account?</p>
        <button>Delete Account</button>
        </div>
        


    </div>
  )
}
