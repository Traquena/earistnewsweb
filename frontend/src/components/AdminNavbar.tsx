/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import earistLogo from './Images/earist_logo-Photoroom.png';

interface AdminNavbarProps {
  currentPage?: string;
}

export default function AdminNavbar({ currentPage = 'dashboard' }: AdminNavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin' },
    { id: 'create-news', label: 'Create News', path: '/admin/create-news' },
    { id: 'users', label: 'Users', path: '/admin/users' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-earist-red text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <img 
              src={earistLogo}
              alt="EARIST Logo" 
              className="h-12 w-12"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-2xl font-bold font-serif">Admin Panel</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  currentPage === item.id
                    ? 'bg-earist-yellow text-black'
                    : 'text-white hover:bg-white hover:text-earist-red'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Logout & View Website */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-white hover:underline text-sm font-medium px-2"
              >
                View Website
              </button>
              <button
                onClick={handleLogout}
                className="bg-earist-yellow text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-all hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
