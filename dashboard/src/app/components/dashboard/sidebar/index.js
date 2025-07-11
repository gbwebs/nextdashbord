'use client';

import { useAuth } from '../../../components/Providers/AuthProvider.js';

export default function Sidebar({ view, setView }) {
  const { logout } = useAuth();

  return (
    <aside className="w-64 h-screen p-6 bg-gradient-to-br from-[#f18b54] to-[#f09330] text-white shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-extrabold mb-10">OneClickDrive</h2>

        <nav className="space-y-2">
          <button
            onClick={() => setView('listings')}
            className={`w-full text-left px-4 py-2 rounded-md font-medium transition ${
              view === 'listings'
                ? 'bg-white/20 text-white font-semibold'
                : 'hover:bg-white/10'
            }`}
          >
             Rental Listings
          </button>

          <button
            onClick={() => setView('audit')}
            className={`w-full text-left px-4 py-2 rounded-md font-medium transition ${
              view === 'audit'
                ? 'bg-white/20 text-white font-semibold'
                : 'hover:bg-white/10'
            }`}
          >
            Audit Logs
          </button>
        </nav>
      </div>

      <div className="mt-10 pt-4 border-t border-white/20">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 rounded-md text-red-100 hover:bg-red-600/30 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
