import React, { useEffect, useState } from 'react';
import { listReports } from '../api';
import { Link } from 'react-router-dom';

export default function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    listReports().then(setReports).catch(console.error);
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Reports</h2>
      <ul className="space-y-3">
        {reports.map((r) => (
          <li
            key={r._id}
            className="p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <Link
              to={`/reports/${r._id}`}
              className="text-blue-600 hover:underline"
            >
              {r.name || r._id}
            </Link>
            <span className="block text-sm text-gray-600">
              Credit Score: {r.creditScore}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
