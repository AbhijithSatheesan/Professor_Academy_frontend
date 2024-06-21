import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo_professor from '../../assets/professor.png';
import HamburgerMenu from 'react-hamburger-menu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user_name, image } = useSelector(state => state.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="header flex flex-wrap items-center justify-between bg-indigo-900 text-white" style={{ height: '6rem' }}>
      <div className="flex items-center">
        <Link to="/" className="h-full">
          <img src={logo_professor} alt="Professor Logo" className="logo h-20 p-1" />
        </Link>
        <Link to="/" className="ml-4 text-white hover:text-gray-400">
          Home
        </Link>
      </div>

      <div className="hidden md:flex md:flex-grow md:justify-center h-full">
        <div className="searchbox flex items-center bg-blue-200 rounded-full shadow-md overflow-hidden h-2/4 w-full max-w-md">
          <input
            type="text"
            placeholder="Search colleges, courses..."
            className="bg-blue-200 text-gray-700 p-2 pl-4 outline-none flex-grow"
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-4 pr-4">
        <nav className="nav flex space-x-4">
          <ul className="flex space-x-4 text-white h-full items-center">
            <li className="hover:text-gray-400 cursor-pointer pr-4">
              <Link to="/colleges">Colleges</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer pr-6">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col items-center mr-2 pr-6">
          <Link to="/myprofile" className="hover:text-gray-400">
            <img
              src={image}
              alt="User"
              className="rounded-full w-8 h-8 object-cover"
            />
          </Link>
          <Link to="/myprofile" className="hover:text-gray-400 text-sm">
            {user_name}
          </Link>
        </div>
      </div>

      <div className="md:hidden">
        <button
          className="bg-blue-950 text-white py-2 px-4 rounded-lg hover:bg-blue-950 focus:outline-none"
          onClick={toggleMenu}
        >
          <HamburgerMenu
            isOpen={isOpen}
            menuClicked={toggleMenu}
            width={24}
            height={18}
            strokeWidth={2}
            rotate={0}
            color="white"
            borderRadius={0}
            animationDuration={0.5}
          />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-[6rem] left-0 right-0 bg-blue-950 z-50">
          <nav className="nav flex flex-col space-y-4 p-4">
            <ul className="flex flex-col text-white">
              <li className="hover:text-gray-400 cursor-pointer">
                <Link to="/" onClick={handleNavItemClick}>Home</Link>
              </li>
              <li className="hover:text-gray-400 cursor-pointer">
                <Link to="/colleges" onClick={handleNavItemClick}>Colleges</Link>
              </li>
              <li className="hover:text-gray-400 cursor-pointer">
                <Link to="/login" onClick={handleNavItemClick}>Login</Link>
              </li>
            </ul>

            <div className="searchbox flex items-center bg-gray-700 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search colleges, courses..."
                className="bg-gray-700 text-white p-2 outline-none"
              />
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Search
              </button>
            </div>
          </nav>

          <div className="flex flex-col items-center space-x-2 p-4">
            <Link to="/myprofile" onClick={handleNavItemClick} className="hover:text-gray-400">
              <img
                src={image}
                alt="User"
                className="rounded-full w-8 h-8 object-cover"
              />
            </Link>
            <Link to="/myprofile" onClick={handleNavItemClick} className="hover:text-gray-400 text-sm">
              {user_name}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
