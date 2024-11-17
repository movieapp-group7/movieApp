// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import homeIcon from "../assets/Home.svg"
import profileIcon from "../assets/Profile.svg"
import FilterTags from './FilterTags';

const filters = [
  { label: 'Top Rated', path: 'movies/toprated' },
  { label: 'Up Coming', path: 'movies/upcoming' },
  { label: 'Most Popular', path: 'movies/popular' },
  { label: 'Show Times', path: 'showtimes' },
  { label: 'Groups', path: 'groups' }
];

const Header = () => {

  return (
    <header className="header">
      <div className="header-content">
        {/* Left side: Logo */}
        <div className="header-logo">
          <Link to="/"><img src={homeIcon} className='homeIcon'></img></Link>
        </div>

        {/* Center: filters */}
        <div className="header-filters">
          <FilterTags filters={filters}/>
        </div>

        {/* Right side: Login/register or Welcome back */}
        <div className='login'>
          <Link to="/signin" className='login-content'>Login</Link> | <Link to="/signup" className='login-content'>Register</Link>
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