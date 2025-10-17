import axios from 'axios';
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api' });

export async function uploadXml(file) {
  const fd = new FormData();
  fd.append('file', file);
  const r = await API.post('/reports/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
  return r.data;
}
export async function listReports() { return (await API.get('/reports')).data; }
export async function getReport(id) { return (await API.get(`/reports/${id}`)).data; }
