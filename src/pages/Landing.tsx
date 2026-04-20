/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src= "D:\earistnewsweb\src\components\Images\earist_logo-Photoroom.png" 
            alt="EARIST Campus" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earist-red/90 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-8"
          >
            <h1 className="text-7xl md:text-8xl font-serif font-bold leading-tight">
              Excellence in <br />
              <span className="text-earist-yellow italic">Science & Tech</span>
            </h1>
            <p className="text-2xl md:text-3xl font-light leading-relaxed opacity-90">
              Empowering the next generation of innovators and leaders since 1945. 
              Join the Eulogio "Amang" Institute of Science and Technology.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <Link 
                to="/news" 
                className="bg-earist-yellow text-black px-10 py-4 rounded-full font-bold text-xl flex items-center gap-3 hover:bg-yellow-400 transition-all hover:scale-105 shadow-2xl"
              >
                Read Latest News <ArrowRight />
              </Link>
              <Link 
                to="/login" 
                className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white hover:text-earist-red transition-all shadow-2xl"
              >
                Student Portal
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-12">
          {[
            { label: 'Founded', value: '1945' },
            { label: 'Students', value: '15k+' },
            { label: 'Programs', value: '45+' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="text-right"
            >
              <p className="text-earist-yellow text-4xl font-serif font-bold">{stat.value}</p>
              <p className="text-white/70 uppercase tracking-widest text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-earist-red text-white p-20 flex flex-col justify-center space-y-8">
          <h2 className="text-5xl font-serif font-bold italic">Our Mission</h2>
          <p className="text-2xl font-light leading-relaxed">
            To provide quality education in science and technology, and to produce 
            highly competent and socially responsible professionals who will 
            contribute to the national development.
          </p>
        </div>
        <div className="bg-earist-yellow text-black p-20 flex flex-col justify-center space-y-8">
          <h2 className="text-5xl font-serif font-bold italic">Our Vision</h2>
          <p className="text-2xl font-light leading-relaxed">
            A center of excellence in science and technology education, 
            research, and community service in the Asia-Pacific region.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gray-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/tech-bg/1920/1080?blur=10" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10 space-y-12">
          <h2 className="text-6xl font-serif font-bold italic">Ready to start your journey?</h2>
          <p className="text-2xl max-w-2xl mx-auto opacity-80">
            Join thousands of students who are shaping the future of technology at EARIST.
          </p>
          <div className="flex justify-center gap-8">
            <button className="bg-earist-red text-white px-12 py-5 rounded-full font-bold text-2xl hover:bg-red-700 transition-all hover:scale-105 shadow-2xl">
              Apply Now
            </button>
            <Link to="/news" className="bg-white text-black px-12 py-5 rounded-full font-bold text-2xl hover:bg-gray-200 transition-all hover:scale-105 shadow-2xl">
              Explore News
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
