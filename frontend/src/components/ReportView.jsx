import React, { useEffect, useState } from 'react';
import { getReport } from '../api';
import { useParams } from 'react-router-dom';

export default function ReportView(){
  const { id } = useParams();
  const [report, setReport] = useState(null);
  useEffect(()=> { getReport(id).then(setReport).catch(console.error); }, [id]);
  if (!report) return <div>Loading...</div>;
  return (
    <div>
      <h2>Basic Details</h2>
      <p><strong>Name:</strong> {report.name}</p>
      <p><strong>Mobile:</strong> {report.mobilePhone}</p>
      <p><strong>PAN:</strong> {report.pan}</p>
      <p><strong>Score:</strong> {report.creditScore}</p>

      <h3>Summary</h3>
      <p>Total accounts: {report.totalAccounts}</p>
      <p>Active: {report.activeAccounts}</p>
      <p>Closed: {report.closedAccounts}</p>
      <p>Current balance: {report.currentBalanceAmount}</p>
      <p>Secured: {report.securedAmount} | Unsecured: {report.unsecuredAmount}</p>

      <h3>Accounts</h3>
      {report.creditAccounts.map((acc, i)=>(
        <div key={i} style={{border:'1px solid #ddd', padding:8, marginBottom:8}}>
          <div><strong>Subscriber:</strong> {acc.subscriberName}</div>
          <div><strong>Account #:</strong> {acc.accountNumber}</div>
          <div><strong>Current Balance:</strong> {acc.currentBalance}</div>
          <div><strong>Amount Past Due:</strong> {acc.amountPastDue}</div>
        </div>
      ))}
    </div>
  );
}
