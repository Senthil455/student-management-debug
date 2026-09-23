const studentsBody = document.getElementById('studentsBody');
const resetBtn = document.getElementById('resetBtn');
const manageMsg = document.getElementById('manageMsg');

document.getElementById('refreshBtn').addEventListener('click', loadStudents);
resetBtn.addEventListener('click', resetData);

loadStudents();

async function loadStudents() {
  const result = await api('/api/students');
  if (!result.ok || !result.data.success) {
    showMessage(manageMsg, 'Could not load students.', 'error');
    return;
  }
  renderTable(result.data.students);
}

function renderTable(students) {
  if (students.length === 0) {
    studentsBody.innerHTML = '<tr><td colspan="8" class="empty">No students found.</td></tr>';
    return;
  }
  studentsBody.innerHTML = students.map(function (s) {
    return '<tr>' +
      '<td>' + s.id + '</td>' +
      '<td>' + escapeHtml(s.registerNumber) + '</td>' +
      '<td>' + escapeHtml(s.name) + '</td>' +
      '<td>' + escapeHtml(s.email) + '</td>' +
      '<td>' + escapeHtml(s.phone) + '</td>' +
      '<td>' + escapeHtml(s.department) + '</td>' +
      '<td>' + s.year + '</td>' +
      '<td><button class="btn-danger btn-small" data-id="' + s.id + '">Delete</button></td>' +
      '</tr>';
  }).join('');
}

studentsBody.addEventListener('click', async function (e) {
  const btn = e.target.closest('button[data-id]');
  if (!btn) {
    return;
  }
  const id = Number(btn.getAttribute('data-id'));
  if (!confirm('Delete student with ID ' + id + '?')) {
    return;
  }
  const result = await api('/api/students/' + id, { method: 'DELETE' });
  if (!result.ok || !result.data.success) {
    showMessage(manageMsg, result.data.message || 'Delete failed.', 'error');
    return;
  }
  showMessage(manageMsg, 'Student deleted.', 'success');
  loadStudents();
});

async function resetData() {
  if (!confirm('Restore the original sample data? All added students will be removed.')) {
    return;
  }
  const result = await api('/api/reset', { method: 'POST' });
  if (!result.ok || !result.data.success) {
    showMessage(manageMsg, 'Reset failed.', 'error');
    return;
  }
  showMessage(manageMsg, 'Sample data restored.', 'success');
  loadStudents();
}
