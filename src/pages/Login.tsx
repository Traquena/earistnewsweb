/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flex justify-center items-center py-24 px-4 bg-white min-h-[700px]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-earist-red p-12 rounded-[40px] shadow-2xl w-full max-w-lg border-[6px] border-white outline outline-1 outline-gray-200"
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <img 
              src= "D:\earistnewsweb\src\components\Images\earist_logo-Photoroom.png" 
              alt="EARIST Logo" 
              className="h-20 w-20"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-white text-5xl font-serif font-bold italic">Login</h2>
          </div>

          <div className="w-full space-y-6">
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full p-5 rounded-md border-none focus:ring-4 focus:ring-earist-yellow outline-none text-2xl placeholder:text-gray-400"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-5 rounded-md border-none focus:ring-4 focus:ring-earist-yellow outline-none text-2xl placeholder:text-gray-400"
            />
          </div>

          <button className="w-full bg-earist-yellow text-black font-bold py-5 rounded-full text-3xl hover:bg-yellow-400 transition-all hover:scale-[1.02] shadow-xl mt-4">
            Log in
          </button>

          <a href="#" className="text-white hover:underline text-xl font-medium">Forgot Password ?</a>
        </div>
      </motion.div>
    </div>
  );
}
