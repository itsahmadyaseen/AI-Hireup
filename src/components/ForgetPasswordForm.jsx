'use client';

import { useState } from 'react';

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset instructions sent to your email.');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-600">Enter your email to receive reset instructions</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center text-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-center text-sm">
              {message}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send reset instructions'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
