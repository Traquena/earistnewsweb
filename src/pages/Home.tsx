/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Search, Calendar, User, Tag } from 'lucide-react';
import { useState } from 'react';
import { NEWS_ARTICLES, NewsArticle } from '../types';

export default function Home() {
  const [dateFilter, setDateFilter] = useState<string>('All');
  const [authorFilter, setAuthorFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  // Filter articles based on criteria
  const filteredArticles = NEWS_ARTICLES.filter(article => {
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

    // Author filter
    const authorMatch = authorFilter === '' || article.author.toLowerCase().includes(authorFilter.toLowerCase());

    // Role filter
    const roleMatch = roleFilter === 'All' || article.role === roleFilter;

    // Search filter (title, content, tags)
    const searchMatch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return dateMatch && authorMatch && roleMatch && searchMatch;
  });

  const mainArticle = filteredArticles[0];
  const otherNews = filteredArticles.slice(1);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Filters Section */}
      <div className="mb-12 bg-white p-6 rounded-lg shadow-lg border">
        <h3 className="text-2xl font-serif font-bold mb-6">Filter News</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Date Filter */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <Calendar size={16} />
              Date Filter
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="All">All Time</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Custom">Custom Range</option>
            </select>
            {dateFilter === 'Custom' && (
              <div className="space-y-2">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Start Date"
                />
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="End Date"
                />
              </div>
            )}
          </div>

          {/* Author Filter */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <User size={16} />
              Author / Publisher
            </label>
            <input
              type="text"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Filter by author"
            />
          </div>

          {/* Role Filter */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <Tag size={16} />
              User Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="All">All Roles</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Search */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <Search size={16} />
              Search (Title, Keywords, Tags)
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Search articles..."
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main News Section */}
        <div className="lg:col-span-2 space-y-10">
          {mainArticle ? (
            <>
              <div className="flex justify-between items-baseline">
                <h2 className="text-6xl font-serif font-bold italic leading-tight">{mainArticle.title}</h2>
                <span className="text-earist-red font-bold text-xl whitespace-nowrap ml-4">{mainArticle.date}</span>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-lg overflow-hidden shadow-2xl border-[12px] border-black bg-black"
              >
                <img 
                  src={mainArticle.image} 
                  alt={mainArticle.title} 
                  className="w-full h-[500px] object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <h3 className="text-white text-5xl md:text-6xl font-serif font-bold leading-tight drop-shadow-2xl">
                    {mainArticle.title}
                  </h3>
                </div>
              </motion.div>

              <p className="text-3xl font-serif leading-relaxed text-gray-900 font-medium">
                {mainArticle.summary}
              </p>
            </>
          ) : (
            <p className="text-2xl text-gray-500">No articles match the current filters.</p>
          )}
        </div>

        {/* Other News Section */}
        <div className="space-y-10">
          <div className="flex justify-between items-center border-b-4 border-black pb-4">
            <h2 className="text-4xl font-serif font-bold italic">Other News</h2>
            <div className="flex gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
                <ChevronLeft size={48} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
                <ChevronRight size={48} />
              </button>
            </div>
          </div>

          <div className="space-y-16">
            {otherNews.map((article) => (
              <motion.div 
                key={article.id}
                whileHover={{ x: 10 }}
                className="flex flex-col gap-6 group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl shadow-xl border-4 border-gray-100">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-earist-red text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg">
                    {article.date}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4 border-t-2 border-gray-100">
                    <h4 className="text-xl font-serif font-bold uppercase tracking-tight text-center">
                      {article.title}
                    </h4>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold leading-tight group-hover:text-earist-red transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-lg text-gray-600 italic leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-3 pt-8">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className={`h-4 w-4 rounded-full transition-all ${i === 1 ? 'bg-earist-yellow scale-125' : 'bg-gray-800'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
