# CreditSea — Fullstack Assignment

## Overview
Process Experian soft-pull XMLs, persist to MongoDB and show an interactive report.

## Setup (backend)
1. cd backend
2. cp .env.example .env
3. set MONGO_URI and PORT
4. npm install
5. npm run dev   # uses nodemon

## Setup (frontend)
1. cd frontend
2. npm install
3. set REACT_APP_API_URL=http://localhost:4000/api
4. npm run dev

## API Endpoints
- POST /api/reports/upload (form-data: file)
- GET /api/reports
- GET /api/reports/:id

## Tests
- Backend: `npm test` (runs jest/supertest)
- Frontend: run component smoke tests (optional)

## Notes
- XML parsing uses xml2js. Mapping is in `backend/src/services/xmlParser.service.js`.
- Save original xml in DB (rawXml) for auditing.
