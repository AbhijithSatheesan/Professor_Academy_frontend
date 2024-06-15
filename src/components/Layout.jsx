import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import LoadingSpinner from './LoadingSpinner';

const HEADER_HEIGHT = '6rem'; // Set the header height to 6rem (96px)
const FOOTER_HEIGHT = 48; // Replace with the actual height of your Footer component

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500); // Simulate loading time for demonstration
    };

    handleRouteChange();
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading && <LoadingSpinner />}
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ height: HEADER_HEIGHT }}>
        <Header />
      </div>
      {/* Main Content */}
      <div className="relative z-10 pt-[6rem]"> {/* Add relative positioning and z-index */}
        {children}
      </div>
      {/* Footer */}
      <div className="bg-white text-white text-center py-4" style={{ height: FOOTER_HEIGHT }}>
        Footer content here
      </div>
    </div>
  );
};

export default Layout;
