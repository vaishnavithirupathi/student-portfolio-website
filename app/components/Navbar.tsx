'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200">
          Student Portfolio
        </Link>
        <div className="flex gap-6">
          {session ? (
            <>
              <Link href="/portfolio" className="hover:text-gray-200">
                My Portfolio
              </Link>
              <Link href="/projects/add" className="hover:text-gray-200">
                Add Project
              </Link>
              <Link href="/blogs/add" className="hover:text-gray-200">
                Add Blog
              </Link>
              <Link href="/education/add" className="hover:text-gray-200">
                Add Education
              </Link>
              <Link href="/profile" className="hover:text-gray-200">
                Profile
              </Link>
              <Link href="/api/auth/signout" className="hover:text-gray-200">
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="hover:text-gray-200">
                Sign In
              </Link>
              <Link href="/auth/register" className="hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
