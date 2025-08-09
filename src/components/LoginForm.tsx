'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  interface LoginFormData {
    email: string;
    password: string;
  }

  interface ChangeEventTarget {
    name: string;
    value: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  interface LoginResponse {
    token: string;
    user: Record<string, unknown>;
    error?: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);

    try {
      const response: Response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data: LoginResponse = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-indigo-600">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              ></path>
            </svg>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-600">Sign in to your AI Interviewer account</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center text-sm">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
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
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => alert('Forgot password functionality would be implemented here')}
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Social login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-3">or sign in with</p>
            <div className="flex justify-center gap-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Gmail" />
                <span className="text-sm text-gray-700">Google</span>
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5 mr-2" alt="Facebook" />
                 <span className="text-sm text-gray-700">Facebook</span>
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <img src="https://www.svgrepo.com/show/475689/twitter-color.svg" className="h-5 w-5 mr-2" alt="Twitter" />
                <span className="text-sm text-gray-700">Twitter</span>
              </button>
            </div>
          </div>

          {/* Sign Up */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&#39;t have an account?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
