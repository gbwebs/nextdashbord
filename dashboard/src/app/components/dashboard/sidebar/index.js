'use client';
import Link from 'next/link';
import { useAuth } from '../../../components/Providers/AuthProvider.js';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-blue-600">OneClick Drive</h2>

      <nav className="space-y-4">
        <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">
          Listings
        </Link>
        <Link href="/dashboard/audit" className="block text-gray-700 hover:text-blue-600">
          Audit Log
        </Link>
        <button
          onClick={logout}
          className="block w-full text-left text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
