'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/Providers/AuthProvider.js';
import { useFeedback } from '../../components/Providers/Feedbackprovider.js';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { login } = useAuth();
  const { showMessage } = useFeedback();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      login(email); // sets context
      showMessage('success', 'Logged in successfully');
      router.push('/dashboard');
    } else {
      showMessage('error', 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 w-full mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
