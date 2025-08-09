'use client';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600">
          AI Interviewer
        </div>
        <nav className="hidden md:flex space-x-6 font-medium">
          <button className="hover:text-indigo-600 transition-colors">About</button>
          <button className="hover:text-indigo-600 transition-colors">How It Works</button>
          <button className="hover:text-indigo-600 transition-colors">Pricing</button>
          <button className="hover:text-indigo-600 transition-colors">Blog</button>
          <button className="hover:text-indigo-600 transition-colors">Contact</button>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-indigo-600 transition-colors">
            Login
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
