/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-earist-red text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl font-serif font-bold italic mb-4">About Us</h1>
          <p className="text-2xl font-light max-w-3xl mx-auto">
            Eulogio "Amang" Institute of Science and Technology - Empowering Future Leaders
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-serif font-bold italic mb-8 text-earist-red">Introduction</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Welcome to the Eulogio "Amang" Institute of Science and Technology. Founded with a commitment to excellence in education and research, our institution has been a beacon of innovation and knowledge for students and professionals alike. We pride ourselves on our dedication to fostering intellectual growth, technological advancement, and social responsibility.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Through our comprehensive programs and state-of-the-art facilities, we prepare our students to excel in a rapidly evolving world and contribute meaningfully to society.
            </p>
          </div>
        </motion.section>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20 bg-earist-yellow/10 rounded-3xl p-12"
        >
          <h2 className="text-5xl font-serif font-bold italic mb-8 text-earist-red">Mission</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-800 leading-relaxed">
              Our mission is to provide quality education in science and technology that develops globally competitive graduates equipped with professional and moral competence. We are committed to:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-3 mt-6">
              <li>Delivering excellence in teaching and research</li>
              <li>Fostering innovation and technological advancement</li>
              <li>Promoting social responsibility and community engagement</li>
              <li>Developing leaders who positively impact society</li>
              <li>Creating an inclusive and supportive learning environment</li>
            </ul>
          </div>
        </motion.section>

        {/* Vision */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-serif font-bold italic mb-8 text-earist-red">Vision</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed bg-white border-l-8 border-earist-red p-8 rounded-lg">
              To be a leading institution of science and technology recognized locally and internationally for advancing knowledge, innovation, and positive social change through quality education and research.
            </p>
          </div>
        </motion.section>

        {/* About the Organization */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-serif font-bold italic mb-8 text-earist-red">About the Organization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="prose prose-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With decades of experience in higher education, EARIST has established itself as a premier institution dedicated to academic excellence. Our campus features modern facilities, experienced faculty, and a vibrant student community.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We offer a diverse range of programs spanning science, technology, engineering, and related fields, designed to meet the evolving needs of the industry and society.
              </p>
            </div>
            <div className="bg-gradient-to-br from-earist-red/5 to-earist-yellow/10 rounded-3xl p-8">
              <h3 className="text-2xl font-serif font-bold text-earist-red mb-6">Key Highlights</h3>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-earist-red font-bold text-2xl">✓</span>
                  <span>World-class faculty and researchers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-earist-red font-bold text-2xl">✓</span>
                  <span>State-of-the-art laboratories and equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-earist-red font-bold text-2xl">✓</span>
                  <span>Strong industry partnerships</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-earist-red font-bold text-2xl">✓</span>
                  <span>Comprehensive student support services</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* System Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20 bg-earist-yellow/10 rounded-3xl p-12"
        >
          <h2 className="text-5xl font-serif font-bold italic mb-8 text-earist-red">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Online Portal', desc: 'Access to learning materials and course registration' },
              { title: 'Library System', desc: 'Digital and physical resources for research and study' },
              { title: 'Research Labs', desc: 'State-of-the-art facilities for innovative research' },
              { title: 'Student Support', desc: 'Counseling, mentoring, and career guidance services' },
              { title: 'Collaboration Tools', desc: 'Virtual classrooms and interactive learning platforms' },
              { title: 'News Management', desc: 'Stay informed with campus news and announcements' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-earist-red"
              >
                <h3 className="text-2xl font-serif font-bold text-earist-red mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Members */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl font-serif font-bold italic mb-8 text-earist-red">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Maria Santos', role: 'President', dept: 'Administration' },
              { name: 'Prof. Juan Dela Cruz', role: 'VP for Academic Affairs', dept: 'Academic Services' },
              { name: 'Eng. Rosa Martinez', role: 'VP for Research', dept: 'Research & Development' },
              { name: 'Dr. Carlos Reyes', role: 'Dean of Engineering', dept: 'College of Engineering' },
              { name: 'Dr. Ana Garcia', role: 'Dean of Science', dept: 'College of Science' },
              { name: 'Prof. Miguel Lopez', role: 'Director of IT', dept: 'Information Technology' },
              { name: 'Dr. Lisa Chen', role: 'Library Director', dept: 'Library Services' },
              { name: 'Engr. Paulo Silva', role: 'Facilities Manager', dept: 'Campus Services' },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.04 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border-t-4 border-earist-red"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-earist-red to-earist-yellow flex items-center justify-center text-white">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-earist-red font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.dept}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-20 bg-earist-red text-white rounded-3xl p-12"
        >
          <h2 className="text-5xl font-serif font-bold italic mb-12 text-earist-yellow">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <MapPin size={32} className="text-earist-yellow flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p className="text-lg">
                  Eulogio "Amang" Institute of Science and Technology<br />
                  Gregorio Araneta University Ave, Quezon City<br />
                  Metro Manila, Philippines
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={32} className="text-earist-yellow flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-lg">
                  Main: (02) 8929-3740<br />
                  Admissions: (02) 8929-3750<br />
                  Student Services: (02) 8929-3760
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail size={32} className="text-earist-yellow flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-lg">
                  info@earist.edu.ph<br />
                  admissions@earist.edu.ph<br />
                  support@earist.edu.ph
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-earist-yellow/30 text-center">
            <p className="text-lg">
              We welcome inquiries and look forward to connecting with you. Reach out anytime!
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
