'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProjectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    technologies: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/projects/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/portfolio');
        router.refresh();
        setFormData({ title: '', description: '', link: '', technologies: '' });
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add project');
      }
    } catch {
      alert('Failed to add project');
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
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.description}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
          Project Link (optional)
        </label>
        <input
          type="url"
          id="link"
          name="link"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.link}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
          Technologies (comma separated)
        </label>
        <input
          type="text"
          id="technologies"
          name="technologies"
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.technologies}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Project'}
      </button>
    </form>
  );
}
