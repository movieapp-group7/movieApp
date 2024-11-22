import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';

const MainLayout = () => (
  <div>
    <Header />
    <SearchBar/>
    <main>
      <Outlet /> {/* This will render the child routes */}
    </main>
  </div>
);

export default MainLayout;
