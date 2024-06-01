import React from 'react';
import { Link } from 'react-router-dom';
import logo_professor from '../../assets/professor.png';


const Header = () => {
  return (
    <header className='header p-4 flex flex-wrap items-center justify-between bg-gray-900 text-white'>
     <Link to="/">
      <img src={logo_professor} alt="Professor Logo" className="logo w-12 h-12" />
     </Link>

      <nav className='nav flex flex-grow justify-end space-x-4 md:justify-between md:flex-grow-0'> {/* Responsive navigation */}
        <ul className='flex space-x-4 text-white'>
          <li className='hover:text-gray-400 cursor-pointer'>
            <Link to="/">Home</Link>
          </li>
          <li className='hover:text-gray-400 cursor-pointer'>
            <Link to="/colleges">Colleges</Link>
          </li>
          <li className='hover:text-gray-400 cursor-pointer'>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <div className='searchbox flex items-center bg-gray-700 rounded-lg overflow-hidden'>
        <input
          type="text"
          placeholder='Search colleges, courses...'
          className='bg-gray-700 text-white p-2 outline-none'
        />

        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
