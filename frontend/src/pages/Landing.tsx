/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ExternalLink, Star } from 'lucide-react';

export default function Landing() {
  const [articles, setArticles] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data.filter(a => a.status === 'published'));
        }
      })
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  const latestNews = articles;
  const featuredAnnouncements = articles.filter(article => article.category === 'Politics').slice(0, 2);
  
  const upcomingEvents = [
    { id: 1, title: 'EARIST Career Fair 2026', date: 'April 25, 2026', description: 'Connect with top companies and explore career opportunities.' },
    { id: 2, title: 'Science Research Symposium', date: 'May 10, 2026', description: 'Showcase innovative research projects from students and faculty.' }
  ];

  const highlights = [
    { title: 'New Research Lab Opens', image: 'https://picsum.photos/seed/lab/400/300', description: 'State-of-the-art facilities for science and technology research.' },
    { title: 'Student Achievement Awards', image: 'https://picsum.photos/seed/awards/400/300', description: 'Celebrating outstanding student accomplishments.' }
  ];

  const categoryBadge = (category: string) => {
    const styles: Record<string, string> = {
      Politics: 'bg-earist-red text-white',
      Science: 'bg-earist-yellow text-black',
      Sports: 'bg-earist-yellow text-black',
      Nature: 'bg-earist-green text-white',
      Instruction: 'bg-earist-yellow text-black',
      Events: 'bg-earist-red text-white',
    };
    return styles[category] ?? 'bg-gray-200 text-gray-800';
  };

  return (
    <>
      {/* Full-width Hero Cover */}
      <section className="relative w-full min-h-[75vh] overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/campus/1600/900')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex min-h-[75vh] flex-col items-center justify-center px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            Welcome to EARIST
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/80 max-w-3xl">
            Excellence in Science & Technology Education
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 space-y-16">
      {/* All News */}
      <section>
        <h2 className="text-4xl font-serif font-bold mb-8">All News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.length > 0 ? latestNews.map(article => (
            <motion.div
              key={article.article_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25 }}
              onClick={() => navigate(`/article/${article.article_id}`)}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-2xl flex flex-col"
            >
              <img
                src={article.image_url || `https://picsum.photos/seed/${article.article_id}/800/450`}
                alt={article.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    to={`/topic/${encodeURIComponent(article.category)}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.24em] shadow-md ${categoryBadge(article.category)}`}
                  >
                    {article.category}
                  </Link>
                  <h3 className="mt-4 text-2xl font-semibold text-gray-900 mb-4 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {article.summary}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between text-sm text-gray-500 gap-2">
                  <span>{new Date(article.published_date).toLocaleDateString()}</span>
                  <span>{article.author}</span>
                </div>
              </div>
            </motion.div>
          )) : (
            <p className="text-gray-500">No news articles published yet.</p>
          )}
        </div>
      </section>

      {/* Featured Announcements */}
      <section>
        <h2 className="text-4xl font-serif font-bold mb-8 flex items-center gap-2">
          <Star className="text-earist-yellow" />
          Featured Announcements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredAnnouncements.length > 0 ? featuredAnnouncements.map(article => (
            <div key={article.article_id} className="bg-earist-red text-white p-6 rounded-lg cursor-pointer hover:bg-red-800 transition-colors" onClick={() => navigate(`/article/${article.article_id}`)}>
              <h3 className="text-2xl font-bold mb-4">{article.title}</h3>
              <p className="mb-4">{article.summary}</p>
              <span className="text-earist-yellow">{new Date(article.published_date).toLocaleDateString()}</span>
            </div>
          )) : (
            <p className="text-gray-500">No featured announcements at this time.</p>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <h2 className="text-4xl font-serif font-bold mb-8 flex items-center gap-2">
          <Calendar className="text-earist-red" />
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map(event => (
            <div key={event.id} className="bg-white border-2 border-earist-red p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
              <p className="text-earist-red font-semibold mb-2">{event.date}</p>
              <p className="text-gray-600">{event.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Highlights */}
      <section>
        <h2 className="text-4xl font-serif font-bold mb-8">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden shadow-lg">
              <img src={highlight.image} alt={highlight.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
