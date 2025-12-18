import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className='w-full mx-auto px-2 md:px-4 lg:px-5 bg-cyan-950'>
      <Navbar></Navbar>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;