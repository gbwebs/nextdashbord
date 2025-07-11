'use client';
import { useState } from 'react';
import { useAuth } from '../components/Providers/AuthProvider';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const success = await login(email.trim(), password.trim());
    if (!success) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#cc4700] to-[#ed8413] px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-orange-100">
        <h2 className="text-3xl font-bold text-center text-[#cc4700] mb-6 tracking-tight">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-600 text-center bg-red-50 px-3 py-2 rounded border border-red-200">
            {error}
          </div>
        )}

        <div className="mb-4 text-xs text-center text-gray-600 bg-orange-50 p-3 rounded border border-orange-200">
          <p>
            <strong>Demo:</strong><br />
            user: <code>admin@oneclickdrive.com</code><br />
            pass: <code>admin123</code>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc4700]"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#cc4700]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#cc4700] to-[#ed8413] text-white py-2 rounded-md hover:opacity-90 transition font-semibold shadow-md"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
