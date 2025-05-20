import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AddProjectForm from '@/app/components/AddProjectForm';

export default async function AddProjectPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please sign in to add projects.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
        Add New Project
      </h1>
      <AddProjectForm />
    </div>
  );
}
