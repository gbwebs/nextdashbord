'use client';

import { useState } from 'react';
import Sidebar from '../components/dashboard/sidebar';
import Topbar from '../components/dashboard/topbar';
import CarTable from '../components/dashboard/listitem';
import AuditLog from '../components/dashboard/audit';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState('listings'); // 'audit' or 'listings'

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar view={view} setView={setView} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4">
          {view === 'listings' && <CarTable />}
          {view === 'audit' && <AuditLog />}
        </main>
      </div>
    </div>
  );
}
