/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

export default function ArticleDetail() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${articleId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
        <h1 className="text-4xl font-serif font-bold text-gray-900">Article Not Found</h1>
        <p className="text-gray-600 text-lg">The article you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-earist-red text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Return Home
        </button>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Article Header with Blurred Background */}
      <div className="relative w-full overflow-hidden bg-gray-900 min-h-[400px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={article.image_url || `https://picsum.photos/seed/${article.article_id}/1600/900`}
            alt=""
            className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Back to previous page
          </button>

          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Left Column: Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full lg:w-[400px] flex-shrink-0"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 sticky top-24">
                <img
                  src={article.image_url || `https://picsum.photos/seed/${article.article_id}/800/1200`}
                  alt={article.title}
                  className="w-full h-full object-contain bg-black/20"
                />
              </div>
            </motion.div>

            {/* Right Column: All Content */}
            <div className="flex-1 text-white">
              <Link
                to={`/topic/${encodeURIComponent(article.category)}`}
                className={`inline-flex rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider mb-6 shadow-md ${categoryBadge(article.category)}`}
              >
                {article.category}
              </Link>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight drop-shadow-lg mb-8"
              >
                {article.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap items-center gap-6 text-white/80 text-sm md:text-base font-medium mb-12 pb-8 border-b border-white/10"
              >
                <div className="flex items-center gap-2">
                  <User size={18} className="text-earist-yellow" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-earist-yellow" />
                  <span>{new Date(article.published_date).toLocaleDateString()}</span>
                </div>
              </motion.div>

              {/* Summary and Main Content */}
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-white/90 font-medium italic border-l-4 border-earist-yellow pl-6">
                  {article.summary}
                </p>
                
                <div className="text-white/80 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
