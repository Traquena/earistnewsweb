/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { useAuth } from '../contexts/AuthContext';
import { NEWS_ARTICLES } from '../types';

export default function Admin() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Total Articles', value: NEWS_ARTICLES.length, color: 'bg-blue-500' },
    { label: 'Published', value: NEWS_ARTICLES.length, color: 'bg-green-500' },
    { label: 'Categories', value: 4, color: 'bg-purple-500' },
    { label: 'Users', value: 150, color: 'bg-orange-500' },
  ];

  const recentArticles = NEWS_ARTICLES.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-earist-red to-red-700 text-white p-6 md:p-8 rounded-xl shadow-lg mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2">Welcome, {user?.name || user?.username}!</h2>
          <p className="text-lg md:text-xl opacity-90">Manage your news articles and content from this dashboard.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.color} text-white p-6 rounded-xl shadow-lg`}
            >
              <p className="text-sm md:text-base opacity-90 mb-2">{stat.label}</p>
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-earist-red to-red-700 text-white p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold">Recent Articles</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map((article, index) => (
                  <motion.tr
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-900 font-medium">
                      <p className="truncate">{article.title}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{article.author}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{article.date}</td>
                    <td className="px-4 md:px-6 py-4 text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                      <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 md:px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button className="text-earist-red hover:text-red-700 font-semibold">
              View All Articles →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
