import React from 'react'
import Testimonial from '../components/common/Testimonial'
import PropertyList from '../components/crud/PropertyList';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  return (
    <div>
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-black transition-all duration-300">
        <div className="flex justify-end px-6 pt-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:opacity-80"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <h1 className="text-3xl font-bold text-center my-6">
          Property Listings
        </h1>
        <PropertyList />
      </div>
      <div>
        <Testimonial />
      </div>
    </div>
  );
}

export default Home