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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Audit Logs</h2>
      <ul className="space-y-2">
        {logs.map((log, idx) => (
          <li key={idx} className="bg-gray-100 p-3 rounded shadow-sm text-sm">
            [{new Date(log.timestamp).toLocaleString()}] {log.admin} performed <strong>{log.action}</strong> on listing #{log.listingId}
          </li>
        ))}
      </ul>
    </div>
  );
}
