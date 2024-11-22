import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import searchIcon from "../assets/search.svg"
import filterIcon from "../assets/filter.svg"
import FilterTags from './FilterTags';

const filters = [
  { label: 'Top Rated', path: 'movies/toprated' },
  { label: 'Up Coming', path: 'movies/upcoming' },
  { label: 'Most Popular', path: 'movies/popular' },
  { label: 'Show Times', path: 'showtimes' },
  { label: 'Groups', path: 'groups' }
];

const SearchBar = () => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };
  const [searchTitle,setSearchTitle] = useState('')
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTitle.trim()) { 
      navigate('/movies/title/' + searchTitle);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-group">
          <button onClick={toggleFilterMenu}className="search-button"><img className='filterIcon' src={filterIcon}></img></button>      
          <input 
            type="text" 
            placeholder="Search for movies..." 
            value={searchTitle} 
            onChange={(e) => setSearchTitle(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button"><img className='searchIcon' src={searchIcon}></img></button>
      </div>
    </div>
    );
};

export default SearchBar;



