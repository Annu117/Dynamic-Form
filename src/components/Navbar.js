// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
        Dynamic Forms
        </div>
        <ul className="flex space-x-6">
        <li>
            <Link to="/" className="text-white hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/event-registration" className="text-white hover:text-gray-400">
              Event Registration
            </Link>
          </li>
          <li>
            <Link to="/job-application" className="text-white hover:text-gray-400">
              Job Application
            </Link>
          </li>
          <li>
            <Link to="/survey" className="text-white hover:text-gray-400">
              Survey
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
