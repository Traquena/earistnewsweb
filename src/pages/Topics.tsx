/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '../types';

export const TOPICS = [
  { name: 'Quantum AI Breakthroughs', image: 'https://picsum.photos/seed/science1/600/340', date: 'Feb 20, 2026', category: 'Science' },
  { name: 'New Research Grants Announced', image: 'https://picsum.photos/seed/science2/600/340', date: 'Feb 18, 2026', category: 'Science' },
  { name: 'Lab Safety Innovations', image: 'https://picsum.photos/seed/science3/600/340', date: 'Feb 16, 2026', category: 'Science' },
  { name: 'Campus Government Reform', image: 'https://picsum.photos/seed/politics1/600/340', date: 'Feb 14, 2026', category: 'Politics' },
  { name: 'Election Watch Updates', image: 'https://picsum.photos/seed/politics2/600/340', date: 'Feb 12, 2026', category: 'Politics' },
  { name: 'New Policy Announcement', image: 'https://picsum.photos/seed/politics3/600/340', date: 'Feb 10, 2026', category: 'Politics' },
  { name: 'Intercollegiate Finals', image: 'https://picsum.photos/seed/sports1/600/340', date: 'Feb 08, 2026', category: 'Sports' },
  { name: 'Track Meet Results', image: 'https://picsum.photos/seed/sports2/600/340', date: 'Feb 06, 2026', category: 'Sports' },
  { name: 'Nature Conservation Drive', image: 'https://picsum.photos/seed/nature1/600/340', date: 'Feb 04, 2026', category: 'Nature' },
  { name: 'Environmental Innovation Fair', image: 'https://picsum.photos/seed/nature2/600/340', date: 'Feb 02, 2026', category: 'Nature' },
];

export default function Topics() {
  const { category } = useParams();
  const selectedCategory = category ? decodeURIComponent(category) : null;
  const categoryTopics = selectedCategory
    ? TOPICS.filter((topic) => topic.category === selectedCategory)
    : [];

  return (
    <div className="container mx-auto px-6 py-12">
      {!selectedCategory ? (
        <>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <h2 className="text-6xl font-serif font-bold italic">News</h2>
            <div className="flex flex-wrap gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  to={`/topic/${encodeURIComponent(cat)}`}
                  className="bg-earist-yellow text-black px-10 py-3 rounded-full font-bold text-2xl hover:bg-yellow-400 transition-all hover:scale-105 shadow-lg active:scale-95"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
         

          <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-earist-yellow text-black px-5 py-3 rounded-full text-lg font-semibold">
                Viewing articles in category:
              </span>
              <span className="bg-earist-red text-white px-5 py-3 rounded-full text-lg font-bold">
                {selectedCategory}
              </span>
            </div>
            <Link to="/topics" className="text-earist-red font-semibold underline">
              Browse all categories
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categoryTopics.length > 0 ? categoryTopics.map((topic, index) => {
              const topicIndex = TOPICS.findIndex((t) => t.name === topic.name);
              return (
                <Link key={`${topic.name}-${index}`} to={`/article/${topicIndex + 1}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200 bg-white cursor-pointer"
                  >
                    <img
                      src={topic.image}
                      alt={topic.name}
                      className="w-full h-56 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-earist-red font-semibold">{topic.date}</span>
                      </div>
                      <h4 className="text-2xl font-serif font-bold mb-3 text-gray-900">
                        {topic.name}
                      </h4>
                      <p className="text-gray-600">Latest updates and analysis for {selectedCategory.toLowerCase()} topics.</p>
                    </div>
                  </motion.div>
                </Link>
              );
            }) : (
              <div className="col-span-full text-center text-gray-500 py-20">
                No articles available for {selectedCategory}.
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
            <button className="bg-earist-yellow text-black px-4 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all">
              PREV
            </button>
            {Array.from({ length: 10 }, (_, idx) => (
              <button
                key={idx}
                className="min-w-[44px] bg-earist-yellow text-black rounded-full px-4 py-3 font-bold hover:bg-yellow-400 transition-all"
              >
                {idx + 1}
              </button>
            ))}
            <button className="bg-earist-yellow text-black px-4 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all">
              NEXT
            </button>
          </div>
        </>
      )}
    </div>
  );
}
