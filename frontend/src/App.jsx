import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReportList from './components/ReportList';
import ReportView from './components/ReportView';
import { uploadXml } from './api';

function UploadForm(){
  const [file, setFile] = React.useState(null);
  const [msg, setMsg] = React.useState('');
  async function submit(e){
    e.preventDefault();
    if (!file) return setMsg('Pick XML first');
    try {
      const res = await uploadXml(file);
      setMsg('Uploaded: ' + res.id);
    } catch (err) {
      setMsg('Error: ' + (err.response?.data?.error || err.message));
    }
  }
  return (
    <form onSubmit={submit}>
      <input type="file" accept=".xml" onChange={e=>setFile(e.target.files[0])} />
      <button type="submit">Upload XML</button>
      <div>{msg}</div>
    </form>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:10, borderBottom:'1px solid #ccc'}}>
        <Link to="/">Reports</Link> | <Link to="/upload">Upload</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ReportList/>} />
        <Route path="/upload" element={<UploadForm/>} />
        <Route path="/reports/:id" element={<ReportView/>} />
      </Routes>
    </BrowserRouter>
  );
}
