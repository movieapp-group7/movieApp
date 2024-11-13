// src/components/Header.js
import React, { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import FilterTags from './FilterTags';
import './Header.css';
import {UserContext} from '../context/UserContext.js'; 

const filters = [
  { label: 'Top Rated', path: 'movies/toprated' },
  { label: 'Up Coming', path: 'movies/upcoming' },
  { label: 'Most Popular', path: 'movies/popular' },
  { label: 'Show Times', path: 'showtimes' },
  { label: 'Groups', path: 'groups' }
];

const Header = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const { user, signOut } = useContext(UserContext);

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/signin"); 
  };


  return (
    <header className="header">
      <div className="header-content">
        {/* Left side: Logo */}
        <div className="header-logo">
          <h1><Link to="/">Movie Log</Link></h1>
        </div>

        {/* Center: Search Bar */}
        <div className="header-search">
          <SearchBar />
        </div>

        {/* Right side: User options */}
        <div className="header-user">
          
        {user && user.email ? (
            <>
              <Link to="/profile">Account</Link>
              <Link onClick={handleSignOut}>Sign Out</Link>
            </>
          ) : (
            <>
              <Link to="/signin">Login</Link> | <Link to="/signup">Register</Link>
            </>
          )}



        </div>
      </div>

      {/* Filter tags (below Search Bar on larger screens, dropdown menu on smaller screens) */}
      <div className="filter-container">
        <div className="filter-tags-desktop">
          <FilterTags filters={filters}/>
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
    </header>
  );
};

export default Header;