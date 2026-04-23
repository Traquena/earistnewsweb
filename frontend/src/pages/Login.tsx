/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import earistLogo from '../components/Images/earist_logo-Photoroom.png';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    if (isRegisterMode) {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, fullName }),
        });

        if (response.ok) {
          setSuccessMsg('Account created successfully! You can now log in.');
          setIsRegisterMode(false);
          setPassword('');
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to create account');
        }
      } catch (err) {
        setError('An error occurred during registration');
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const success = await login(username, password);
        if (success) {
          navigate('/admin');
        } else {
          setError('Invalid username or password');
        }
      } catch (err) {
        setError('An error occurred during login');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-12 md:py-24 px-4 bg-white min-h-[600px] md:min-h-[700px]">
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-earist-red p-8 md:p-12 rounded-[40px] shadow-2xl w-full max-w-lg border-[6px] border-white outline outline-1 outline-gray-200"
      >
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 md:gap-8">
          <div className="flex items-center gap-3 md:gap-4">
            <img 
              src={earistLogo}
              alt="EARIST Logo" 
              className="h-16 md:h-20 w-16 md:w-20"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-white text-3xl md:text-5xl font-serif font-bold italic">
              {isRegisterMode ? 'Register' : 'Login'}
            </h2>
          </div>

          <div className="w-full space-y-4 md:space-y-6">
            <AnimatePresence mode="popLayout">
              {isRegisterMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 md:space-y-6"
                >
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Full Name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-4 md:p-5 rounded-md border-none focus:ring-4 focus:ring-earist-yellow outline-none text-lg md:text-2xl placeholder:text-gray-400 transition-all"
                    required
                  />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 md:p-5 rounded-md border-none focus:ring-4 focus:ring-earist-yellow outline-none text-lg md:text-2xl placeholder:text-gray-400 transition-all"
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <input 
              type="text" 
              name="username"
              placeholder="Admin Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 md:p-5 rounded-md border-none focus:ring-4 focus:ring-earist-yellow outline-none text-lg md:text-2xl placeholder:text-gray-400 transition-all"
              required
            />
            <input 
              type="password" 
              name="password"
              placeholder="Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-green-200 border-2 border-green-400 text-green-800 px-4 py-3 rounded-md text-center text-sm md:text-base"
            >
              {successMsg}
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-earist-yellow text-black font-bold py-4 md:py-5 rounded-full text-2xl md:text-3xl hover:bg-yellow-400 transition-all hover:scale-[1.02] shadow-xl mt-2 md:mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : isRegisterMode ? 'Create Account' : 'Log in'}
          </button>

          <div className="flex flex-col items-center gap-2">
            <button 
              type="button" 
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError('');
                setSuccessMsg('');
              }}
              className="text-white hover:underline text-lg md:text-xl font-medium"
            >
              {isRegisterMode ? 'Already have an account? Log in' : 'Need an account? Create one'}
            </button>
            {!isRegisterMode && (
              <a href="#" className="text-white/80 hover:text-white hover:underline text-sm md:text-base font-medium mt-2">
                Forgot Password?
              </a>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
