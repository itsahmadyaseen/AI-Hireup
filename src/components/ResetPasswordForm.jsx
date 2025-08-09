'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function ResetPasswordForm({ token }) {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!formData.password || !formData.confirmPassword) {
      setError('Both password fields are required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
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
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-600">Enter your new password below</p>
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
            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Reset button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
