import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import EducationCard from '../components/EducationCard';
import { ObjectId } from 'mongodb';

interface ProjectDocument {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  description: string;
  link?: string;
  technologies?: string;
  createdAt: Date;
}

interface BlogDocument {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  content: string;
  createdAt: Date;
}

interface EducationDocument {
  _id: ObjectId;
  userId: ObjectId;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  createdAt: Date;
}

type SerializedDocument<T> = Omit<T, '_id' | 'userId'> & {
  _id: string;
  userId: string;
};

function serializeDocument<T extends { _id: ObjectId; userId: ObjectId }>(doc: T): SerializedDocument<T> {
  const { _id, userId, ...rest } = doc;
  return {
    ...rest,
    _id: _id.toString(),
    userId: userId.toString(),
  } as SerializedDocument<T>;
}

export default async function PortfolioPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please sign in to view your portfolio.</p>
        </div>
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db('student_portfolio');
  const user = await db.collection('users').findOne({ email: session.user?.email });

  if (!user) {
    return (
      <div className="text-center mt-10">
        User not found. Please try signing in again.
      </div>
    );
  }

  const projects = await db.collection('projects')
    .find({ userId: user._id })
    .sort({ createdAt: -1 })
    .toArray() as ProjectDocument[];
  
  const blogs = await db.collection('blogs')
    .find({ userId: user._id })
    .sort({ createdAt: -1 })
    .toArray() as BlogDocument[];
  
  const education = await db.collection('education')
    .find({ userId: user._id })
    .sort({ startYear: -1 })
    .toArray() as EducationDocument[];

  // Serialize the documents
  const serializedProjects = projects.map(serializeDocument);
  const serializedBlogs = blogs.map(serializeDocument);
  const serializedEducation = education.map(serializeDocument);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900">
        {user.name}'s Portfolio
      </h1>

      <div className="grid gap-8 sm:gap-12">
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Projects</h2>
          {serializedProjects.length === 0 ? (
            <p className="text-gray-500 text-center">No projects added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {serializedProjects.map((project) => (
                <ProjectCard 
                  key={project._id}
                  {...project}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Blog Posts</h2>
          {serializedBlogs.length === 0 ? (
            <p className="text-gray-500 text-center">No blog posts added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {serializedBlogs.map((blog) => (
                <BlogCard 
                  key={blog._id}
                  {...blog}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Education</h2>
          {serializedEducation.length === 0 ? (
            <p className="text-gray-500 text-center">No education details added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {serializedEducation.map((edu) => (
                <EducationCard 
                  key={edu._id}
                  {...edu}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
