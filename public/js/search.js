const regnoInput = document.getElementById('regnoInput');
const searchBtn = document.getElementById('searchBtn');
const resultCard = document.getElementById('resultCard');

document.getElementById('search-button').addEventListener('click', handleSearch);

async function handleSearch() {
  const regno = regnoInput.value.trim();
  if (regno === '') {
    resultCard.innerHTML = '<p class="empty">Enter a register number to search.</p>';
    return;
  }

  const result = await api('/api/students');

  if (!result.ok || !result.data.success) {
    resultCard.innerHTML = '<p class="empty">' + escapeHtml(result.data.message || 'Student not found') + '</p>';
    return;
  }

  renderStudent(result.data.students[0]);
}

function renderStudent(student) {
  resultCard.innerHTML =
    '<div class="student-card">' +
    '<h3>' + escapeHtml(student.name) + '</h3>' +
    '<p><span class="field-label">Register Number:</span> ' + escapeHtml(student.registerNumber) + '</p>' +
    '<p><span class="field-label">Department:</span> ' + escapeHtml(student.department) +
    ' &nbsp;|&nbsp; <span class="field-label">Year:</span> ' + escapeHtml(student.year) + '</p>' +
    '<p><span class="field-label">Email:</span> ' + escapeHtml(student.email) + '</p>' +
    '<p><span class="field-label">Phone:</span> ' + escapeHtml(student.phone) + '</p>' +
    '</div>';
}
