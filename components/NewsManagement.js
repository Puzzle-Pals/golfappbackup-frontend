import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function NewsManagement() {
  const [news, setNews] = useState([]);
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data);
    } catch (err) {
      setError('Failed to fetch news');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editId) {
        await api.put(`/news/${editId}`, { content });
        setSuccess('News updated');
        setEditId(null);
      } else {
        await api.post('/news', { content });
        setSuccess('News added');
      }
      setContent('');
      fetchNews();
    } catch (err) {
      setError('Failed to save news');
    }
  };

  const handleEdit = (newsItem) => {
    setEditId(newsItem._id);
    setContent(newsItem.content);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/news/${id}`);
      setSuccess('News deleted');
      fetchNews();
    } catch (err) {
      setError('Failed to delete news');
    }
  };

  return (
    <div className="news-management">
      <h2 className="text-2xl font-bold text-magnolia-cream mb-6 font-playfair">Manage News</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="News Content"
          className="mb-4 p-3 bg-augusta-green text-magnolia-cream border-2 border-sky-blue rounded-lg w-full font-lato min-h-[100px]"
          required
        />
        <button type="submit" className="bg-azalea-pink text-pine-brown px-6 py-3 rounded-lg font-lato font-bold hover:bg-sky-blue hover:text-magnolia-cream">
          {editId ? 'Update' : 'Add'} News
        </button>
        {error && <p className="text-azalea-pink mt-4 font-lato">{error}</p>}
        {success && <p className="text-augusta-green mt-4 font-lato">{success}</p>}
      </form>
      <div className="news-list">
        {news.map((item) => (
          <div key={item._id} className="mb-6 p-6 bg-pine-brown border-2 border-sky-blue rounded-lg">
            <p className="text-magnolia-cream font-lato">{item.content}</p>
            <p className="text-sky-blue text-sm mt-2 font-lato">{new Date(item.createdAt).toLocaleDateString()}</p>
            <div className="mt-4 flex space-x-4">
              <button onClick={() => handleEdit(item)} className="bg-azalea-pink text-pine-brown px-4 py-2 rounded-lg font-lato hover:bg-sky-blue hover:text-magnolia-cream">
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="bg-azalea-pink text-pine-brown px-4 py-2 rounded-lg font-lato hover:bg-sky-blue hover:text-magnolia-cream">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}