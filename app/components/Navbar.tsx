'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200">
          Student Portfolio
        </Link>
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <HiX style={{ width: 28, height: 28 }} /> : <HiMenu style={{ width: 28, height: 28 }} />}
        </button>
        <div className="hidden md:flex gap-6">
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
      {menuOpen && (
        <div className="md:hidden bg-gray-900 px-4 pb-4 flex flex-col gap-4 animate-fade-in-down">
          {session ? (
            <>
              <Link href="/portfolio" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                My Portfolio
              </Link>
              <Link href="/projects/add" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                Add Project
              </Link>
              <Link href="/blogs/add" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                Add Blog
              </Link>
              <Link href="/education/add" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                Add Education
              </Link>
              <Link href="/profile" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <Link href="/api/auth/signout" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/signin" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link href="/auth/register" className="hover:text-gray-200" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
