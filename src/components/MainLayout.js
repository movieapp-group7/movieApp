import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';
import "./MainLayout.css"

const MainLayout = () => (
  <div className='Background'>
    <Header />
    <SearchBar/>
    <main>
      <Outlet /> {/* This will render the child routes */}
    </main>
  </div>
);

export default MainLayout;
