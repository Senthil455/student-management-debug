// Student Management System - entry point.
// Serves the frontend from /public and the REST API under /api.

// Load .env without extra dependency (organizer sets CLUE_ACT1..4 there, file is gitignored)
try {
  const fs = require('fs');
  const envPath = require('path').join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf-8').split('\n').forEach(function(line){
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g,'');
    });
  }
} catch(e) {}

const path = require('path');
const express = require('express');
const db = require('./src/data/db');
const studentRoutes = require('./src/routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/students', studentRoutes);

// Clue vault — passwords NOT in code. Set via env (.env not committed) or organizer will provide.
// Example .env: CLUE_ACT1=csau-act1-2026 etc. Do not hardcode here.
const cluePasswords = {
  1: process.env.CLUE_ACT1,
  2: process.env.CLUE_ACT2,
  3: process.env.CLUE_ACT3,
  4: process.env.CLUE_ACT4
};

app.post('/api/clue/:act', function (req, res) {
  const act = String(req.params.act);
  const expected = cluePasswords[act];
  if (!expected) {
    return res.status(503).json({ success: false, message: 'Clue not configured — ask organizer to set CLUE_ACT' + act + ' env' });
  }
  const provided = String(req.body && req.body.password || '');
  if (provided === expected) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Wrong password' });
});

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
