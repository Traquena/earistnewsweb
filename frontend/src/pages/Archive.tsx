/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Search, Tag } from 'lucide-react';
import { NEWS_ARTICLES } from '../types';

export default function Archive() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Filter articles (simulate old/past content by filtering older dates)
  const filteredArticles = NEWS_ARTICLES.filter(article => {
    const articleDate = new Date(article.date);
    const cutoffDate = new Date('2026-03-01'); // Articles before March 2026 are "old"
    const isOld = articleDate < cutoffDate;

    if (!isOld) return false; // Only show old articles

    // Keyword search
    const keywordMatch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const categoryMatch = categoryFilter === 'All' || article.category === categoryFilter;

    // Date filter
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
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl font-serif font-bold mb-8">Archive</h1>
      <p className="text-xl text-gray-600 mb-12">
        Browse our collection of old news, past announcements, and historical records.
      </p>

      {/* Filters */}
      <div className="mb-12 bg-white p-6 rounded-lg shadow-lg border">
        <h3 className="text-2xl font-serif font-bold mb-6">Filter Archive</h3>
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

      {/* Archive Content */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden border">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{article.date}</span>
                  <span>{article.author}</span>
                </div>
                <div className="mt-2">
                  <span className="inline-block bg-earist-red text-white px-2 py-1 rounded text-xs">
                    {article.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No archived content matches your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}