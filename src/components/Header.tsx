/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '../types';

export default function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [topicsOpen, setTopicsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTopicsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoginPage) {
    return (
      <header className="bg-earist-red text-white py-4 px-6">
        <div className="container mx-auto flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/3/3a/Eulogio_%22Amang%22_Institute_of_Science_and_Technology_logo.png" 
            alt="EARIST Logo" 
            className="h-16 w-16"
            referrerPolicy="no-referrer"
          />
          <h1 className="flex-grow text-center text-xl md:text-3xl font-bold uppercase tracking-wider">
            Eulogio "Amang" Institute of Science and Technology
          </h1>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-white py-4 px-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex-shrink-0">
          <img 
            src= "src/components/Images/earist_logo-Photoroom.png" 
            alt="EARIST Logo" 
            className="h-20 w-20"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="flex-grow text-center text-earist-red text-xl md:text-3xl font-bold uppercase tracking-tight px-4">
          Eulogio "Amang" Institute of Science and Technology
        </h1>
        <div className="flex-shrink-0">
          <Link 
            to="/login" 
            className="bg-earist-red text-white px-8 py-2 rounded-full font-bold hover:bg-red-700 transition-colors text-lg"
          >
            LOGIN
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-earist-red text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link to="/news" className="text-5xl font-serif font-bold italic">News</Link>
            <div className="hidden lg:flex gap-10 font-bold text-xl items-center">
              <Link to="/" className="hover:text-earist-yellow transition-colors">Home</Link>
              <Link to="/about" className="hover:text-earist-yellow transition-colors">About us</Link>
              <Link to="/library" className="hover:text-earist-yellow transition-colors">Library</Link>
              <Link to="/instruction" className="hover:text-earist-yellow transition-colors">Instruction</Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setTopicsOpen((open) => !open)}
                  className="flex items-center gap-2 hover:text-earist-yellow transition-colors font-bold text-xl"
                >
                  Topics
                  <span className="text-earist-yellow text-xl">▾</span>
                </button>
                {topicsOpen && (
                  <div className="absolute left-0 top-full mt-3 min-w-[180px] flex-col rounded-3xl bg-white text-earist-red shadow-2xl">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat}
                        to={`/topic/${encodeURIComponent(cat)}`}
                        className="block px-5 py-3 text-lg font-semibold hover:bg-earist-red/10"
                        onClick={() => setTopicsOpen(false)}
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer hover:text-earist-yellow transition-colors group">
            <Search size={32} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold text-2xl">Search</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
