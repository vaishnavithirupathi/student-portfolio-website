import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Student Portfolio Site
        </h1>
        <p className="mb-6 text-gray-700">
          Welcome! Create your digital portfolio to showcase your projects, blogs,
          and education. <br />
          Created by{" "}
          <span className="font-semibold text-gray-900">T. VAISHNAVI</span>
        </p>
        <div className="flex flex-col gap-4">
          <Link
            href="/auth/signin"
            className="py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded transition-colors"
          >
            Register
          </Link>
          <Link
            href="/portfolio"
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded transition-colors"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
