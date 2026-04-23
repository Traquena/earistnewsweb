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
      <div className="relative w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={article.image_url || `https://picsum.photos/seed/${article.article_id}/1600/900`}
            alt=""
            className="w-full h-full object-cover blur-2xl opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-50" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Portrait Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-[320px] md:max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
          >
            <img
              src={article.image_url || `https://picsum.photos/seed/${article.article_id}/800/1200`}
              alt={article.title}
              className="w-full h-full object-contain bg-black/20"
            />
          </motion.div>

          {/* Article Info */}
          <div className="flex-1 text-center md:text-left">
            <Link
              to={`/topic/${encodeURIComponent(article.category)}`}
              className={`inline-flex rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wider mb-6 shadow-md ${categoryBadge(article.category)}`}
            >
              {article.category}
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg mb-8"
            >
              {article.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-white/90 text-sm md:text-base font-medium"
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
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 mt-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-earist-red transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back to previous page
        </button>

        <article className="prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:text-earist-red prose-a:text-blue-600">
          <p className="lead text-xl md:text-2xl text-gray-600 font-medium italic border-l-4 border-earist-yellow pl-6 mb-12">
            {article.summary}
          </p>
          
          <div className="text-gray-800 whitespace-pre-wrap">
            {article.content}
          </div>
        </article>
      </div>
    </div>
  );
}
