'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBlogForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/blogs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.refresh();
        setFormData({ title: '', content: '' });
        router.push('/portfolio');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add blog post');
      }
    } catch {
      alert('Failed to add blog post');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Blog Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500"
          value={formData.content}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Blog Post'}
      </button>
    </form>
  );
}
