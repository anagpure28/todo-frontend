import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#user-menu-button') && !event.target.closest('#user-menu')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8 w-full">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            type="button"
            className="sm:hidden p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✖' : '☰'}
          </button>

          {/* Logo */}
          <div className="flex flex-1 items-center space-x-6">

            <img className="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Logo" />

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-4">
      {['Create Task', 'Tasks'].map((tab) => (
        <button
          key={tab}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            window.location.pathname === (tab === 'Create Task' ? '/' : '/tasks')
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
          onClick={() => navigate(tab === 'Create Task' ? '/' : '/task')}
        >
          {tab}
        </button>
      ))}
    </div>
          </div>


          {/* Profile Dropdown */}
          {/* <div className="relative">
            <button
              id="user-menu-button"
              className="flex items-center p-2 text-gray-400 hover:text-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" />
            </button>

            {dropdownOpen && (
              <div
                id="user-menu"
                className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md py-1"
              >
                {['Your Profile', 'Settings', 'Sign out'].map((item) => (
                  <button
                    key={item}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div> */}
          <div className="flex items-center space-x-4">
  {/* Sign Up & Log In Buttons */}
  <button className="px-2 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
    Sign Up
  </button>
  <button className="px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
    Log In
  </button>

  {/* Profile Dropdown */}
  <div className="relative">
    <button
      id="user-menu-button"
      className="flex items-center p-2 text-gray-400 hover:text-white"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <img
        className="h-8 w-8 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="Profile"
      />
    </button>

    {dropdownOpen && (
      <div
        id="user-menu"
        className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-md py-1"
      >
        {/* {['Your Profile', 'Settings', 'Sign out'].map((item) => (
          <button
            key={item}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setDropdownOpen(false)}
          >
            {item}
          </button>
        ))} */}
            <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {localStorage.removeItem("todo-token");
                navigate("/login")
            }}
          >
            Log out
          </button>
      </div>
    )}
  </div>
</div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-2 pb-3">
          {['Dashboard', 'Team', 'Projects', 'Calendar'].map((tab) => (
            <button
              key={tab}
              className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${activeTab === tab ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
              onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
