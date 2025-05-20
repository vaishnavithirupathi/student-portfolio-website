'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddEducationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/education/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.refresh();
        setFormData({ institution: '', degree: '', field: '', startYear: '', endYear: '' });
        router.push('/portfolio');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add education details');
      }
    } catch (error) {
      alert('Failed to add education details');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
          Institution Name
        </label>
        <input
          type="text"
          id="institution"
          name="institution"
          required
          value={formData.institution}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
          Degree
        </label>
        <input
          type="text"
          id="degree"
          name="degree"
          required
          value={formData.degree}
          onChange={handleChange}
          placeholder="e.g., Bachelor's, Master's, Ph.D."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="field" className="block text-sm font-medium text-gray-700">
          Field of Study
        </label>
        <input
          type="text"
          id="field"
          name="field"
          required
          value={formData.field}
          onChange={handleChange}
          placeholder="e.g., Computer Science, Mathematics"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">
            Start Year
          </label>
          <select
            id="startYear"
            name="startYear"
            required
            value={formData.startYear}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">
            End Year (or expected)
          </label>
          <select
            id="endYear"
            name="endYear"
            value={formData.endYear}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Present/Expected</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add Education'}
      </button>
    </form>
  );
}
