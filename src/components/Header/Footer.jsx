import React from 'react';
import { Link } from 'react-router-dom';
import facebooklogo from '../../assets/facebook.png';
import instagramlogo from '../../assets/instagram.png';
import twitterlogo from '../../assets/twitter.png';

const Footer = () => {
  const socialMediaLinks = [
    { name: 'Facebook', logo: facebooklogo, url: 'https://facebook.com' },
    { name: 'Instagram', logo: instagramlogo, url: 'https://instagram.com' },
    { name: 'Twitter', logo: twitterlogo, url: 'https://twitter.com' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <p className="text-sm font-semibold">Professor Academy Cheruthoni</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <ul className="space-y-2">
              <li><Link to="/aboutus" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex justify-center md:justify-end space-x-4">
              {socialMediaLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src={social.logo} alt={social.name} className="h-8 w-8" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">&copy; {currentYear} Professor Academy Cheruthoni</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;