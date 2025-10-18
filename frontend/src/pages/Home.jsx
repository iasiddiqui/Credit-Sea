import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">CreditSea</span>
      </h1>
      <p className="text-gray-600 max-w-2xl mb-8 text-lg">
        A simple, secure platform to upload and view your credit reports in a
        clean, organized way. Upload your XML credit report and get instant insights!
      </p>

      <div className="flex gap-4">
        <Link
          to="/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Upload Report
        </Link>
        <Link
          to="/reports"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition"
        >
          View Reports
        </Link>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/545/545682.png"
        alt="Credit Illustration"
        className="w-48 mt-10 opacity-80"
      />
    </div>
  );
}
