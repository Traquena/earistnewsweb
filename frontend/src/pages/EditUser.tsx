import React, { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import AdminNavbar from '../components/AdminNavbar';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    username: '',
    email: '',
    full_name: '',
    role: 'admin',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/users/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch user');
          return res.json();
        })
        .then(data => {
          setUser({
            username: data.username,
            email: data.email,
            full_name: data.full_name,
            role: data.role,
          });
        })
        .catch(err => setError('Could not load user data.'));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate('/admin/users');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update user');
      }
    } catch (err) {
      setError('An error occurred while updating the user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar currentPage="users" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-earist-red to-red-700 text-white p-6 md:p-8 rounded-xl shadow-lg mb-8 flex justify-between items-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold">Edit User</h2>
          <button 
            onClick={() => navigate('/admin/users')}
            className="bg-white text-earist-red px-4 py-2 rounded font-bold hover:bg-gray-100 transition-colors"
          >
            Back to Users
          </button>
        </motion.div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username (Cannot be changed)
            </label>
            <input
              type="text"
              value={user.username}
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 bg-gray-100 text-gray-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              value={user.full_name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={user.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-earist-red focus:border-earist-red sm:text-sm"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-earist-red text-white py-3 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-bold text-lg disabled:opacity-50 transition-all"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
