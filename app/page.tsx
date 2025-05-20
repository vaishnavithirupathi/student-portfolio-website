import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-xs sm:max-w-xl text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 text-gray-900">
          Student Portfolio Site
        </h1>
        <p className="mb-8 text-gray-700 text-lg sm:text-xl">
          Welcome! Create your digital portfolio to showcase your projects, blogs,
          and education. <br />
          Created by{" "}
          <span className="font-semibold text-gray-900">T. VAISHNAVI</span>
        </p>
        <nav aria-label="Main actions" className="flex flex-col gap-4 sm:gap-6">
          <Link
            href="/auth/signin"
            className="py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded transition-colors text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-gray-700"
            tabIndex={0}
            aria-label="Sign in to your account"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="py-4 px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded transition-colors text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-gray-700"
            tabIndex={0}
            aria-label="Register a new account"
          >
            Register
          </Link>
          <Link
            href="/portfolio"
            className="py-4 px-6 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded transition-colors text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-gray-700"
            tabIndex={0}
            aria-label="View your portfolio"
          >
            View Portfolio
          </Link>
        </nav>
      </div>
    </main>
  );
}
