// Request handlers for the student API.
const db = require('../data/db');

function listStudents(req, res) {
  res.json({ success: true, students: db.getAll() });
}

function searchStudent(req, res) {
  const regno = String(req.query.regno || '').trim();

  if (!regno) {
    return res.status(400).json({ success: false, message: 'Register number is required' });
  }

  const student = db.findStudentByRegno(regno);

  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  res.json({ success: true, student: student });
}

function createStudent(req, res) {
  const body = req.body || {};
  const registerNumber = String(body.registerNumber || '').trim();

  if (!registerNumber) {
    return res.status(400).json({ success: false, message: 'Register number is required' });
  }

  const student = db.createStudent({
    registerNumber: registerNumber,
    name: body.name,
    email: body.email,
    phone: body.phone,
    department: body.department,
    year: body.year,
  });

  res.status(201).json({ success: true, student: student });
}

function updateStudent(req, res) {
  const id = Number(req.params.id);
  const updates = req.body || {};

  const updated = db.updateStudent(db.getAll().findIndex((s) => s.id === id), updates);

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  res.json({ success: true, student: updated });
}

function deleteStudent(req, res) {
  const ok = db.deleteStudent(Number(req.params.id));

  if (!ok) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  res.json({ success: true, message: 'Student deleted' });
}

module.exports = {
  listStudents: listStudents,
  searchStudent: searchStudent,
  createStudent: createStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent,
};
