import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

// Upload XML file
export async function uploadXml(file) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await API.post('/reports/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}

// List all reports
export async function listReports() {
  const res = await API.get('/reports');
  return res.data;
}

// Get single report by ID
export async function getReport(id) {
  const res = await API.get(`/reports/${id}`);
  return res.data;
}
