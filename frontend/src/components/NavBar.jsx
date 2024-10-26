// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and if they are an admin
    const loggedStatus = localStorage.getItem('isLoggedIn');
    const adminStatus = localStorage.getItem('isAdmin');
    setIsLoggedIn(loggedStatus === 'true');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const handleLogin = () => {
    const username = prompt('Enter username');
    const password = prompt('Enter password');

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'true');
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/download`, {
        method: 'GET',
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.xlsx';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white px-2 py-1  sm:px-4 sm:py-2 rounded mr-4"
              >
                Download Data
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
