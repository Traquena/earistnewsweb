import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CATEGORIES } from '../types';

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

export default function Topics() {
  const { category } = useParams();
  const selectedCategory = category ? decodeURIComponent(category) : null;
  
  const [allArticles, setAllArticles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch articles from database
  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllArticles(data);
        }
      })
      .catch(err => console.error('Error fetching articles:', err));
  }, []);

  // Filter articles by category and display location
  const categoryTopics = selectedCategory
    ? allArticles.filter((article) => 
        article.category === selectedCategory && 
        article.status === 'published' &&
        (article.display_location === 'topics' || article.display_location === 'both')
      )
    : [];

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(categoryTopics.length / itemsPerPage);
  
  // Get current page's articles
  const paginatedTopics = categoryTopics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
            {paginatedTopics.length > 0 ? paginatedTopics.map((article, index) => {
              return (
                <Link key={`${article.article_id}-${index}`} to={`/article/${article.article_id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200 bg-white cursor-pointer h-full flex flex-col"
                  >
                    <img
                      src={article.image_url || `https://picsum.photos/seed/${article.article_id}/800/450`}
                      alt={article.title}
                      className="w-full h-56 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className={`inline-flex rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.24em] shadow-md ${categoryBadge(article.category)}`}>
                          {article.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-earist-red font-semibold">{new Date(article.published_date).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-2xl font-serif font-bold mb-3 text-gray-900">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 flex-grow line-clamp-3">{article.summary || 'Latest updates and analysis for ' + selectedCategory.toLowerCase() + ' topics.'}</p>
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

          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`bg-earist-yellow text-black px-4 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                PREV
              </button>
              
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`min-w-[44px] rounded-full px-4 py-3 font-bold transition-all ${
                    currentPage === idx + 1 
                      ? 'bg-earist-red text-white scale-110 shadow-lg' 
                      : 'bg-earist-yellow text-black hover:bg-yellow-400'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`bg-earist-yellow text-black px-4 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                NEXT
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

