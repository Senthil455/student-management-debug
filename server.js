// Student Management System - entry point.
// Serves the frontend from /public and the REST API under /api.

const path = require('path');
const express = require('express');
const db = require('./src/data/db');
const studentRoutes = require('./src/routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/students', studentRoutes);

// Restore the original sample data.
app.post('/api/reset', function (req, res) {
  db.reset();
  res.json({ success: true, message: 'Sample data restored' });
});

// Unknown API routes return a JSON 404 instead of an HTML error page.
app.use('/api', function (req, res) {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.listen(PORT, function () {
  console.log('Student Management System running at http://localhost:' + PORT);
});
