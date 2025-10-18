import React, { useEffect, useState } from 'react';
import { getReport } from '../api';
import { useParams } from 'react-router-dom';

export default function ReportView() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    getReport(id).then(setReport).catch(console.error);
  }, [id]);

  if (!report) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Basic Details</h2>
      <div className="space-y-1 text-gray-700">
        <p><strong>Name:</strong> {report.name}</p>
        <p><strong>Mobile:</strong> {report.mobilePhone}</p>
        <p><strong>PAN:</strong> {report.pan}</p>
        <p><strong>Credit Score:</strong> {report.creditScore}</p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Summary</h3>
      <div className="grid grid-cols-2 gap-3 text-gray-700">
        <p>Total Accounts: {report.totalAccounts}</p>
        <p>Active: {report.activeAccounts}</p>
        <p>Closed: {report.closedAccounts}</p>
        <p>Current Balance: ₹{report.currentBalanceAmount}</p>
        <p>Secured: ₹{report.securedAmount}</p>
        <p>Unsecured: ₹{report.unsecuredAmount}</p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Accounts</h3>
      <div className="space-y-3">
        {report.creditAccounts.map((acc, i) => (
          <div
            key={i}
            className="border p-4 rounded-lg shadow-sm bg-gray-50"
          >
            <p><strong>Subscriber:</strong> {acc.subscriberName}</p>
            <p><strong>Account #:</strong> {acc.accountNumber}</p>
            <p><strong>Current Balance:</strong> ₹{acc.currentBalance}</p>
            <p><strong>Amount Past Due:</strong> ₹{acc.amountPastDue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
