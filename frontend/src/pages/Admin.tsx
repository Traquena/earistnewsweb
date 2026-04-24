/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { useAuth } from '../contexts/AuthContext';

export default function Admin() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    totalCategories: 0,
    totalUsers: 0
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch Dashboard Stats
      const fetchDashboardData = async () => {
        try {
          const statsRes = await fetch('/api/dashboard-stats');
          const statsData = await statsRes.json();
          setStats(statsData);

          const articlesRes = await fetch('/api/articles');
          const articlesData = await articlesRes.json();
          if (Array.isArray(articlesData)) {
            setRecentArticles(articlesData);
          }
        } catch (err) {
          console.error(err);
        }
      };

      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const handleDelete = async (articleId: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/articles/${articleId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // Refresh the data
          const statsRes = await fetch('/api/dashboard-stats');
          const statsData = await statsRes.json();
          setStats(statsData);

          const articlesRes = await fetch('/api/articles');
          const articlesData = await articlesRes.json();
          if (Array.isArray(articlesData)) {
            setRecentArticles(articlesData);
          }
        } else {
          alert('Failed to delete the article.');
        }
      } catch (err) {
        console.error('Error deleting article:', err);
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const statCards = [
    { label: 'Total Articles', value: stats.totalArticles, color: 'bg-blue-500' },
    { label: 'Published', value: stats.publishedArticles, color: 'bg-green-500' },
    { label: 'Categories', value: stats.totalCategories, color: 'bg-purple-500' },
    { label: 'Users', value: stats.totalUsers, color: 'bg-orange-500' },
  ];

  const totalPages = Math.ceil(recentArticles.length / itemsPerPage);
  const currentArticles = recentArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <h2 className="text-2xl md:text-4xl font-bold mb-2">Welcome, {user?.full_name || user?.username}!</h2>
          <p className="text-lg md:text-xl opacity-90">Manage your news articles and content from this dashboard.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
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
          <div className="bg-gradient-to-r from-earist-red to-red-700 text-white p-6 md:p-8 flex justify-between items-center">
            <h3 className="text-2xl md:text-3xl font-bold">Recent Articles</h3>
            <button onClick={() => navigate('/admin/create-news')} className="bg-white text-earist-red px-4 py-2 rounded font-bold hover:bg-gray-100 transition-colors">
              + New Article
            </button>
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentArticles.length > 0 ? currentArticles.map((article, index) => (
                  <motion.tr
                    key={article.article_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-900 font-medium">
                      <p className="truncate max-w-xs">{article.title}</p>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">
                        {article.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{article.author}</td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                      {new Date(article.published_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm space-x-2">
                      <button 
                        onClick={() => navigate(`/admin/edit-news/${article.article_id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(article.article_id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No articles found. Create one!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, recentArticles.length)}</span> of <span className="font-medium">{recentArticles.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-earist-red text-white border-earist-red'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
