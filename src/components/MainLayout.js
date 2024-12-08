import React from 'react';
import Header from './Header';
import Footer from './Footer';
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
    <Footer /> {/* Add Footer here */}
  </div>
);

export default MainLayout;
