import React from 'react'
import './Header.css'
import logo_light from '../../assets/doctor.png'
import logo_dark from '../../assets/mbbs.png'
import logo_linux from '../../assets/linux.png'
import logo_mba from '../../assets/mba.png'
import logo_professor from '../../assets/professor.png'
import logo_globe from '../../assets/globe.png'
import search_dark from '../../assets/search_b.png'
import search_white from '../../assets/search_w.png'

const Header = () => {
  return (
    <div className='header flex items-center justify-between bg-gray-900 p-4'>
      <img src={logo_professor} alt="" className='logo w-12 h-12' />
      <ul className='flex space-x-4 text-white'>
        <li className='hover:text-gray-400 cursor-pointer'>Home</li>
        <li className='hover:text-gray-400 cursor-pointer'>Colleges</li>
        <li className='hover:text-gray-400 cursor-pointer'>Login</li>
      </ul>

      <div className='searchbox flex items-center bg-gray-700 rounded-lg overflow-hidden'>
        <input
          type="text"
          placeholder='Search colleges, courses...'
          className='bg-gray-700 text-white p-2 outline-none'
        />
        <img src={search_white} alt="" className='w-6 h-6 mx-2' />
      </div>
      
      <img src={logo_globe} alt="" className='toggle-icon w-8 h-8 mx-4 cursor-pointer' />
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Click Me
      </button>
    </div>
  )
}

export default Header
