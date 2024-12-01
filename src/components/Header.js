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
  { label: 'Groups', path: 'groups' }
];

const Header = () => {
  const { user, signOut } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate("/signin"); 
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
                <Link to="/profile" className='login-content'>Account</Link> | <Link onClick={handleSignOut} className='login-content'>Sign Out</Link>
              </>
            ) : (
             <>
               <Link to="/signin" className='login-content'>Login</Link> | <Link to="/signup" className='login-content'>Register</Link>
             </>
           )}  
        </div>


        {/* Right side: Profile icon */}
        <div className="header-user">
          <Link to="/profile"><img src={profileIcon} className='profileIcon'></img></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

/*

  <div className="filter-container">
      <div className="filter-tags-desktop">
      </div>
        <button className="filter-menu-toggle" onClick={toggleFilterMenu}>
         ☰
        </button>
        {isFilterMenuOpen && (
          <div className="filter-menu">
            <FilterTags filters={filters}/>
            </div>
          )}
</div>
*/