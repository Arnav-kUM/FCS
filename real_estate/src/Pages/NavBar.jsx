import React, { useState } from 'react';

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-white p-5 shadow md:flex md:items-center md:justify-between">
      <div>
        <span className="text-2xl font-bold text-[#9041c1] flex items-center">
          <a href="/">
            <img className="h-10 inline mr-2 rounded-full" src="/Images/real_estate.webp" alt="Failed to load" />
          </a>
          <div>
            <a href="/" className='hover:text-[#ffdd62] duration-500'>REAL ESTATE</a>
          </div>
        </span>
      </div>
      <ul className="md:flex md:items-center">
        <li className="mx-4">
          <a href="" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">
            ABOUT
          </a>
        </li>
        <li className="mx-4">
          <a href="" className="text-xl text-[#9041c1] hover:text-[#ffdd62] duration-500">
            HELP
          </a>
        </li>
        <div className={`relative ${isDropdownOpen ? 'z-10' : ''}`}>
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={toggleDropdown}
          >
            <img className="w-8 h-8 rounded-full" src="Images/User.jpg" alt="user photo" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 -mr-3 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-600">
              <ul className="py-2">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover.bg-gray-100 dark:hover.bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
