'use client';

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="w-full h-14 px-4 flex items-center justify-between bg-black text-white shadow-md sticky top-0 z-40">
      <div className="flex items-center space-x-4">
     
        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={onToggleSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-bold tracking-wide">Dashboard</h1>
      </div>
    </header>
  );
}
