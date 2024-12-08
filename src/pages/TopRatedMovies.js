import React from 'react'
import FilteredMovieList from '../components/FilteredMovieList'

export default function TopRatedMovies() {
  return (
    <div>
      <h1 className='Maintext'>Top Rated Movies</h1>
      <FilteredMovieList type = 'top_rated'/>
    </div>
  )
}
