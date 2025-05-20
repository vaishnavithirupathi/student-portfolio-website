'use client';

interface EducationCardProps {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
}

const EducationCard = ({ _id, institution, degree, field, startYear, endYear }: EducationCardProps) => {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this education record?')) return;

    try {
      const res = await fetch(`/api/education/delete?id=${_id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete education record');
      }
    } catch (error) {
      console.error('Error deleting education:', error);
      alert('Failed to delete education record');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{institution}</h3>
          <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="text-gray-800 mb-2">
          {degree} in {field}
        </div>
        <div className="text-sm text-gray-500">
          {startYear} - {endYear || 'Present'}
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
