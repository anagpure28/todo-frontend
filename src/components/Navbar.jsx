import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("todo-token")); // Direct check
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("todo-token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("todo-token");
    setIsLoggedIn(false);
    navigate("/login");
  };

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
                  onClick={() => navigate(tab === 'Create Task' ? '/' : '/tasks')}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side (Auth Buttons / Profile) */}
          <div className="flex items-center space-x-4">
            {/* Show Sign Up & Log In only if NOT logged in */}
            {!isLoggedIn ? (
              <>
                <button className="px-2 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700" onClick={() => navigate('/signup')}>
                  Sign Up
                </button>
                <button className="px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white" onClick={() => navigate('/login')}>
                  Log In
                </button>
              </>
            ) : (
              // Show Profile Dropdown if logged in
              <div className="relative">
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
                    className="absolute right-0 z-10 mt-3 w-48 bg-gray-800 shadow-lg rounded-md p-1"
                  >
                    <button
                      className="block w-full text-center px-4 py-2 rounded-sm border border-b-white text-sm text-gray-100 bg-gray-700 hover:bg-gray-900"
                      onClick={handleLogout}
                    >
                      Profile
                    </button>
                    <button
                      className="block w-full text-center px-4 py-2 rounded-sm border border-b-white text-sm text-gray-100 bg-gray-700 hover:bg-gray-900"
                      onClick={handleLogout}
                    >
                      Setting
                    </button>
                    <button
                      className="block w-full text-center px-4 py-2 rounded-sm border border-b-white text-sm text-gray-100 bg-gray-700 hover:bg-gray-900"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-2 pb-3">
          {['Dashboard', 'Team', 'Projects', 'Calendar'].map((tab) => (
            <button
              key={tab}
              className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                window.location.pathname === `/${tab.toLowerCase()}`
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => { navigate(`/${tab.toLowerCase()}`); setMobileMenuOpen(false); }}
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