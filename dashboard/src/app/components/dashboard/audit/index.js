'use client';

import { useEffect, useState } from 'react';

export default function AuditLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/audit')
      .then((res) => res.json())
      .then(setLogs);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl font-bold text-[#cc4700] mb-6">Audit Logs</h2>

      {logs.length === 0 ? (
        <div className="bg-orange-100 text-orange-700 px-4 py-3 rounded border border-orange-300 text-sm">
          No audit logs yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gradient-to-r from-[#cc4700] to-[#ed8413] text-white text-left uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Admin</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Listing ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-orange-50 transition">
                  <td className="px-6 py-3 text-gray-600">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {log.admin}
                  </td>
                  <td className="px-6 py-3 text-gray-700 capitalize">
                    {log.action}
                  </td>
                  <td className="px-6 py-3 text-gray-500">#{log.listingId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
