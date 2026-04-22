/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import earistLogo from '../components/Images/earist_logo-Photoroom.png';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (login(username, password)) {
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 300);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex justify-center items-center py-12 md:py-24 px-4 bg-white min-h-[600px] md:min-h-[700px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-earist-red p-8 md:p-12 rounded-[40px] shadow-2xl w-full max-w-lg border-[6px] border-white outline outline-1 outline-gray-200"
      >
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-6 md:gap-8">
          <div className="flex items-center gap-3 md:gap-4">
            <img 
              src={earistLogo}
              alt="EARIST Logo" 
              className="h-16 md:h-20 w-16 md:w-20"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-white text-3xl md:text-5xl font-serif font-bold italic">Login</h2>
          </div>

          <div className="w-full space-y-4 md:space-y-6">
            <input 
              type="text" 
              name="username"
              placeholder="Admin Username" 
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-4 md:p-5 rounded-md border-none focus:ring-4 focus:ring-earist-yellow outline-none text-lg md:text-2xl placeholder:text-gray-400 transition-all"
              required
            />
            <input 
              type="password" 
              name="password"
              placeholder="Admin Password" 
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-4 md:p-5 rounded-md border-none focus:ring-4 focus:ring-earist-yellow outline-none text-lg md:text-2xl placeholder:text-gray-400 transition-all"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-red-200 border-2 border-red-400 text-red-800 px-4 py-3 rounded-md text-center text-sm md:text-base"
            >
              {error}
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-earist-yellow text-black font-bold py-4 md:py-5 rounded-full text-2xl md:text-3xl hover:bg-yellow-400 transition-all hover:scale-[1.02] shadow-xl mt-2 md:mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          <a href="#" className="text-white hover:underline text-lg md:text-xl font-medium">Forgot Password ?</a>
        </form>
      </motion.div>
    </div>
  );
}
