'use client';
import { useAuth } from '../../../components/Providers/AuthProvider.js';

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p className="text-sm text-gray-600">Logged in as: <strong>{user?.email}</strong></p>
    </header>
  );
}
