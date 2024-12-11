// src/components/Header.js
import './Header.css';
import homeIcon from "../assets/Home.svg"
import profileIcon from "../assets/Profile.svg"
import FilterTags from './FilterTags';
import React, { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import {UserContext} from '../context/UserContext.js'; 



const filters = [
  { label: 'Top Rated', path: 'movies/toprated' },
  { label: 'Up Coming', path: 'movies/upcoming' },
  { label: 'Most Popular', path: 'movies/popular' },
  { label: 'Show Times', path: 'showtimes' },
  { label: 'Groups', path: 'groups' },
  {label:'Shares', path:'shares'}
];

const Header = () => {
  const { user, deleteAccount,signOut } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/signin"); 
  };

  
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleNavigate = (path) => {
    setIsDropdownOpen(false); 
    navigate(path);
  };

  const handleDeleteAccount = async() => {
    try {
      await deleteAccount(user.id);
      setShowConfirmation(false);
      signOut();
      navigate("/signin"); 

    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
  };


  return (
    <header className="header">
      <div className="header-content">
        {/* Left side: Logo */}
        <div className="header-logo">
          <Link to="/"><img src={homeIcon} className='homeIcon'></img></Link>
        </div>

        {/* Center: filters */}
        <div className="header-filters">
          <button
            className="filter-toggle"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Filters
          </button>
          <div className={`filter-dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <FilterTags filters={filters} />
          </div>
        </div>

        {/* Right side: Login/register or Welcome back */}
        <div className='login'>
          {user && user.email ? (
              <>
                <Link onClick={handleSignOut} className='login-content'>Sign Out</Link>
              </>
            ) : (
             <>
               <Link to="/signin" className='login-content'>Login</Link> | <Link to="/signup" className='login-content'>Register</Link>
             </>
           )}  
        </div>


        {/* Right side: Profile icon */}
        <div className="header-user">
          <img 
          src={profileIcon}
          className='profileIcon'
          alt="Profile"
          onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div onClick={() => handleNavigate(`/user/${user.id}/account`)} className="dropdown-item">My Account</div>
              <div onClick={() => handleNavigate(`/user/${user.id}/favorite`)} className="dropdown-item">My Favorites</div>
              <div onClick={() => handleNavigate(`/user/${user.id}/review`)} className="dropdown-item">My Reviews</div>
              <div onClick={() => handleNavigate(`/user/${user.id}/group`)} className="dropdown-item">My Groups</div>
              <div onClick={() => handleNavigate(`/user/${user.id}/watchList`)} className="dropdown-item">My Watchlist</div> {/* Added My Watchlist */}
              {/*<div onClick={() => handleNavigate(`/user/${user.id}/settings`)} className="dropdown-item">Account settings</div> */}
              <div onClick={()=>{setShowConfirmation(true)}} className="dropdown-item">Delete Account</div>
            </div>
          )}
        </div>
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
    </header>
  );
};

export default Header;

