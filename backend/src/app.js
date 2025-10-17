const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/report.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/reports', routes);

// basic health check
app.get('/health', (req, res) => res.json({ ok: true }));

module.exports = app;
