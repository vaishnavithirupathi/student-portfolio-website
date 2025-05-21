'use client';

interface BlogCardProps {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const BlogCard = ({ _id, title, content, createdAt }: BlogCardProps) => {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/delete?id=${_id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog post');
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-4">{content}</p>
        <div className="text-sm text-gray-500">
          {typeof createdAt === 'string' && !isNaN(Date.parse(createdAt))
            ? new Date(createdAt).getFullYear()
            : (createdAt instanceof Date && !isNaN(createdAt.getTime())
                ? createdAt.getFullYear()
                : (typeof createdAt === 'string'
                    ? new Date(createdAt).toISOString().slice(0, 10)
                    : 'Unknown'))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
