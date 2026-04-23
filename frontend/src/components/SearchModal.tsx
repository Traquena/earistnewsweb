/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { X, Search, Calendar, Tag } from 'lucide-react';
import { NEWS_ARTICLES } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  if (!isOpen) return null;

  // Filter articles
  const filteredArticles = NEWS_ARTICLES.filter(article => {
    // Keyword search
    const keywordMatch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const categoryMatch = categoryFilter === 'All' || article.category === categoryFilter;

    // Date filter
    const articleDate = new Date(article.date);
    const now = new Date();
    let dateMatch = true;
    if (dateFilter === 'Today') {
      dateMatch = articleDate.toDateString() === now.toDateString();
    } else if (dateFilter === 'This Week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateMatch = articleDate >= weekAgo;
    } else if (dateFilter === 'This Month') {
      dateMatch = articleDate.getMonth() === now.getMonth() && articleDate.getFullYear() === now.getFullYear();
    } else if (dateFilter === 'Custom' && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      dateMatch = articleDate >= start && articleDate <= end;
    }

    return keywordMatch && categoryMatch && dateMatch;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-3xl font-serif font-bold">Search News</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold">
                <Search size={16} />
                Keyword Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="Search by title, content, author, tags..."
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold">
                <Tag size={16} />
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-3 border rounded-md"
              >
                <option value="All">All Categories</option>
                <option value="Science">Science</option>
                <option value="Politics">Politics</option>
                <option value="Sports">Sports</option>
                <option value="Nature">Nature</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold">
                <Calendar size={16} />
                Date Filter
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full p-3 border rounded-md"
              >
                <option value="All">All Time</option>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Custom">Custom Range</option>
              </select>
              {dateFilter === 'Custom' && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                  />
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 overflow-y-auto max-h-96">
          {filteredArticles.length > 0 ? (
            <div className="space-y-4">
              {filteredArticles.map(article => (
                <div key={article.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-2">{article.summary}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}