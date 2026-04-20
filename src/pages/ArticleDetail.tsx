/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useParams } from 'react-router-dom';
import { Download, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { CATEGORIES } from '../types';

const ARTICLES = [
  { id: '1', name: 'Quantum AI Breakthroughs', image: 'https://picsum.photos/seed/science1/800/500', date: 'Feb 20, 2026', category: 'Science', title: 'The Rise of Edge Computing in 2026', content: 'As IoT devices become more sophisticated, edge computing is shifting data processing away from centralized clouds and closer to the devices themselves. This topic explores how this reduces latency for autonomous vehicles and smart city infrastructure.' },
  { id: '2', name: 'New Research Grants Announced', image: 'https://picsum.photos/seed/science2/800/500', date: 'Feb 18, 2026', category: 'Science', title: 'New Research Grants Announced', content: 'The research department has announced new grants for innovative projects in quantum computing and artificial intelligence.' },
  { id: '3', name: 'Lab Safety Innovations', image: 'https://picsum.photos/seed/science3/800/500', date: 'Feb 16, 2026', category: 'Science', title: 'Lab Safety Innovations', content: 'New safety protocols and innovations are being implemented across all research laboratories.' },
  { id: '4', name: 'Campus Government Reform', image: 'https://picsum.photos/seed/politics1/800/500', date: 'Feb 14, 2026', category: 'Politics', title: 'Campus Government Reform', content: 'The campus government is undergoing significant reforms to improve student representation.' },
  { id: '5', name: 'Election Watch Updates', image: 'https://picsum.photos/seed/politics2/800/500', date: 'Feb 12, 2026', category: 'Politics', title: 'Election Watch Updates', content: 'Latest updates on upcoming campus elections and voting information.' },
  { id: '6', name: 'New Policy Announcement', image: 'https://picsum.photos/seed/politics3/800/500', date: 'Feb 10, 2026', category: 'Politics', title: 'New Policy Announcement', content: 'The institution announces new policies affecting student and faculty.' },
  { id: '7', name: 'Intercollegiate Finals', image: 'https://picsum.photos/seed/sports1/800/500', date: 'Feb 08, 2026', category: 'Sports', title: 'Intercollegiate Finals', content: 'Our athletes advance to the intercollegiate finals.' },
  { id: '8', name: 'Track Meet Results', image: 'https://picsum.photos/seed/sports2/800/500', date: 'Feb 06, 2026', category: 'Sports', title: 'Track Meet Results', content: 'Outstanding performances at the recent track meet.' },
  { id: '9', name: 'Nature Conservation Drive', image: 'https://picsum.photos/seed/nature1/800/500', date: 'Feb 04, 2026', category: 'Nature', title: 'Nature Conservation Drive', content: 'Join us in our efforts to conserve local ecosystems.' },
  { id: '10', name: 'Environmental Innovation Fair', image: 'https://picsum.photos/seed/nature2/800/500', date: 'Feb 02, 2026', category: 'Nature', title: 'Environmental Innovation Fair', content: 'Showcasing innovative solutions for environmental challenges.' },
];

export default function ArticleDetail() {
  const { articleId } = useParams();
  const article = ARTICLES.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-2xl text-gray-500">Article not found.</p>
        <Link to="/topics" className="text-earist-red font-semibold underline">
          Back to topics
        </Link>
      </div>
    );
  }

  const recentNews = ARTICLES.filter((a) => a.id !== articleId).slice(0, 3);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
        <h2 className="text-6xl font-serif font-bold italic">News</h2>
        <div className="flex flex-wrap gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/topic/${encodeURIComponent(cat)}`}
              className={`px-6 py-2 rounded-full font-bold text-lg transition-all ${
                cat === article.category
                  ? 'bg-earist-yellow text-black shadow-lg'
                  : 'bg-gray-300 text-black hover:bg-gray-400'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Article */}
        <div className="lg:col-span-2">
          {/* Article Title */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <h1 className="text-5xl font-serif font-bold">{article.title}</h1>
            <div className="flex gap-4 flex-shrink-0">
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <Download size={24} className="text-earist-red" />
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 size={24} className="text-earist-red" />
              </button>
            </div>
          </div>

          {/* Date */}
          <p className="text-earist-red font-bold text-lg mb-6">{article.date}</p>

          {/* Article Image */}
          <motion.img
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            src={article.image}
            alt={article.title}
            className="w-full h-80 object-cover rounded-lg shadow-lg mb-8"
            referrerPolicy="no-referrer"
          />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-800 leading-relaxed">
              {article.content}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              This article provides insights into the latest developments in {article.category.toLowerCase()}, highlighting the importance of staying informed about current trends and innovations in this field.
            </p>
          </div>

          {/* Back Link */}
          <Link
            to={`/topic/${encodeURIComponent(article.category)}`}
            className="text-earist-red font-semibold underline text-lg hover:no-underline"
          >
            ← Back to {article.category}
          </Link>
        </div>

        {/* Recent News Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-3xl font-serif font-bold mb-8">Recent News</h3>
          <div className="space-y-6">
            {recentNews.map((newsItem) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 hover:shadow-md transition-shadow rounded-lg overflow-hidden cursor-pointer group"
              >
                <Link to={`/article/${newsItem.id}`} className="flex gap-4 w-full">
                  <img
                    src={newsItem.image}
                    alt={newsItem.name}
                    className="w-24 h-24 object-cover rounded-lg group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-earist-red transition-colors">
                      {newsItem.name}
                    </p>
                    <p className="text-earist-red font-bold text-xs mt-2">{newsItem.date}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
