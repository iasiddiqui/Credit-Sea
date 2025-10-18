import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReportList from "./components/ReportList";
import ReportView from "./components/ReportView";
import { uploadXml } from "./api";

function UploadForm() {
  const [file, setFile] = React.useState(null);
  const [msg, setMsg] = React.useState("");

  async function submit(e) {
    e.preventDefault();
    if (!file) return setMsg("Please select an XML file");
    try {
      const res = await uploadXml(file);
      setMsg(`✅ Uploaded successfully! Report ID: ${res.id}`);
    } catch (err) {
      setMsg(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upload Credit Report XML</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="file"
          accept=".xml"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full border border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload XML
        </button>
      </form>
      {msg && <p className="mt-4 text-sm text-gray-700">{msg}</p>}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/reports" element={<ReportList />} />
          <Route path="/reports/:id" element={<ReportView />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
