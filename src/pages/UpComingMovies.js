import React from 'react'
import FilteredMovieList from '../components/FilteredMovieList'

export default function UpComingMovies() {
  return (
    <div>
      <h1 className='Maintext'>Up Coming Movies</h1>
      <FilteredMovieList type = 'upcoming'/>
    </div>
  )
}
