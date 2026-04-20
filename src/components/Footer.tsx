/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  // Placeholder for admin-configurable social links
  const socialLinks = {
    facebook: 'https://www.facebook.com/EARISTOfficial', // Replace with admin-set link
    instagram: 'https://www.instagram.com/earistofficial/' // Replace with admin-set link
  };

  return (
    <footer className="bg-earist-red text-white py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* About EARIST */}
        <div>
          <h3 className="text-earist-yellow text-2xl font-bold mb-6 uppercase">About EARIST</h3>
          <ul className="space-y-2 text-lg">
            <li><a href="#" className="hover:underline">Our Story</a></li>
            <li><a href="#" className="hover:underline">Executive Officials & Chief of Offices</a></li>
            <li><a href="#" className="hover:underline">Board of Trustees</a></li>
          </ul>
        </div>

        {/* Affiliates */}
        <div>
          <h3 className="text-earist-yellow text-2xl font-bold mb-6 uppercase">Affiliates</h3>
          <ul className="space-y-4 text-lg">
            <li>
              <a href="#" className="hover:underline block leading-tight">
                PASUC-NCR Research Consortium
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline block leading-tight">
                International Research Conference on Innovation in Engineering, Science, and Technology
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-earist-yellow text-2xl font-bold mb-6 uppercase">Contact us</h3>
          <div className="space-y-6 text-lg">
            <div>
              <p className="font-bold">Location</p>
              <p>Nagtahan St, Sampaloc, Manila, 1008 Metro Manila</p>
            </div>
            <div>
              <p className="font-bold">Contact No:</p>
              <p>0985-848-394-9586</p>
              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                <a 
                  href={socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-earist-yellow transition-colors"
                >
                  <Facebook size={32} />
                </a>
                <a 
                  href={socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-earist-yellow transition-colors"
                >
                  <Instagram size={32} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
