import React, { useEffect, useState } from 'react';
import { listReports } from '../api';
import { Link } from 'react-router-dom';

export default function ReportList(){
  const [reports, setReports] = useState([]);
  useEffect(()=> { listReports().then(setReports).catch(console.error); }, []);
  return (
    <div>
      <h2>Reports</h2>
      <ul>
        {reports.map(r => (
          <li key={r._id}>
            <Link to={`/reports/${r._id}`}>{r.name || r._id} — score: {r.creditScore}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
