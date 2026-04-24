import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import AdminNavbar from '../components/AdminNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Category {
  category_id: number;
  name: string;
}

const CreateNews = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [news, setNews] = useState({
    title: '',
    category_id: '',
    date: '',
    summary: '',
    content: '',
    featureImage: '',
    status: 'published',
    display_location: 'both',
  });
  const [featureImageFile, setFeatureImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0 && !id) {
          setNews(prev => ({ ...prev, category_id: data[0].category_id.toString() }));
        }
      })
      .catch(err => console.error('Error fetching categories:', err));

    if (id) {
      fetch(`/api/articles/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch article');
          return res.json();
        })
        .then(data => {
          setNews({
            title: data.title,
            category_id: data.category_id.toString(),
            date: new Date(data.published_date).toISOString().split('T')[0],
            summary: data.summary || '',
            content: data.content || '',
            featureImage: data.image_url || '',
            status: data.status,
            display_location: data.display_location || 'both',
          });
          if (data.image_url) {
            setImagePreview(data.image_url);
          }
        })
        .catch(err => setError('Could not load article data for editing.'));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFeatureImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = id ? `/api/articles/${id}` : '/api/articles';
      const method = id ? 'PUT' : 'POST';

      const formData = new FormData();
      formData.append('title', news.title);
      formData.append('category_id', news.category_id);
      formData.append('date', news.date);
      formData.append('summary', news.summary);
      formData.append('content', news.content);
      formData.append('status', news.status);
      formData.append('display_location', news.display_location);
      formData.append('author', user?.name || user?.username || 'Admin Team');
      
      if (featureImageFile) {
        formData.append('featureImage', featureImageFile);
      } else if (news.featureImage) {
        formData.append('featureImage', news.featureImage);
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        navigate('/admin');
      } else {
        const data = await response.json();
        setError(data.error || `Failed to ${id ? 'update' : 'create'} article`);
      }
    } catch (err) {
      setError(`An error occurred while ${id ? 'updating' : 'creating'} the article`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="create-news" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-earist-red to-red-700 text-white p-6 md:p-8 rounded-xl shadow-lg mb-8"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2">{id ? 'Edit News' : 'Create News'}</h2>
        </motion.div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={news.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category_id"
                id="category_id"
                value={news.category_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
                required
              >
                {categories.map(cat => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Publication Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={news.date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Summary / Preview Text
            </label>
            <textarea
              name="summary"
              id="summary"
              rows={2}
              value={news.summary}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Full Content
            </label>
            <textarea
              name="content"
              id="content"
              rows={8}
              value={news.content}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label htmlFor="featureImage" className="block text-sm font-medium text-gray-700 mb-1">
                Attached Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    name="featureImage"
                    id="featureImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-red-50 file:text-red-700
                      hover:file:bg-red-100
                      cursor-pointer focus:outline-none"
                  />
                </div>
                {imagePreview && (
                  <div className="h-20 w-20 relative rounded-md overflow-hidden border border-gray-200">
                    <img 
                      src={imagePreview.startsWith('data:') ? imagePreview : (imagePreview.startsWith('http') ? imagePreview : `${window.location.origin}${imagePreview}`)} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">Choose an image from your device to upload.</p>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={news.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label htmlFor="display_location" className="block text-sm font-medium text-gray-700 mb-1">
                Display Location
              </label>
              <select
                name="display_location"
                id="display_location"
                value={news.display_location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
              >
                <option value="both">Both (Homepage & Topics)</option>
                <option value="homepage">Homepage Only</option>
                <option value="topics">Topics Only</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-earist-red text-white py-3 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-bold text-lg disabled:opacity-50 transition-all"
            >
              {isLoading ? (id ? 'Updating...' : 'Creating...') : (id ? 'Update News' : 'Publish News')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;