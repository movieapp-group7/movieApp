import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js';
import FilterTags from '../components/FilterTags.js';
import FilteredMovieList from '../components/FilteredMovieList.js';
import MovieCarouselList from '../components/MovieCarouselList.js';

const Home = () => {
  // const filters = [
  //     { label: 'Top Rated', path: 'toprated' },
  //     { label: 'Up Coming', path: 'upcoming' },
  //     { label: 'Most Popular', path: 'popular' }
  //   ];

  return (
    <div>
    <h1>Movie Website</h1>
    {/* <SearchBar />
    <FilterTags filters={filters}/> */}
    <MovieCarouselList type='now_playing' />
    

    <h2>
      <Link to="/movies/toprated"> Top Rated &gt; </Link>
    </h2>
    <FilteredMovieList type = 'top_rated'/>

    <h2>
      <Link to="/movies/upcoming"> Up Coming &gt; </Link>
    </h2>
    <FilteredMovieList type = 'upcoming'/>

    <h2>
      <Link to="/movies/popular"> Most Popular &gt; </Link>
    </h2>
    <FilteredMovieList type = 'popular'/>


  </div>
  )
};

export default Home;
