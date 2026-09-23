const findRegno = document.getElementById('findRegno');
const findBtn = document.getElementById('findBtn');
const findMsg = document.getElementById('findMsg');
const updateForm = document.getElementById('updateForm');
const updateMsg = document.getElementById('updateMsg');

let currentStudent = null;

findBtn.addEventListener('click', loadStudent);

async function loadStudent() {
  clearMessage(findMsg);
  clearMessage(updateMsg);

  const regno = findRegno.value.trim();
  if (regno === '') {
    showMessage(findMsg, 'Enter a register number to find the student.', 'error');
    return;
  }

  const result = await api('/api/students/search?regno=' + encodeURIComponent(regno));

  if (!result.ok || !result.data.success) {
    showMessage(findMsg, result.data.message || 'Student not found', 'error');
    currentStudent = null;
    updateForm.style.display = 'none';
    return;
  }

  currentStudent = result.data.student;
  fillForm(currentStudent);
  updateForm.style.display = 'block';
}

function fillForm(student) {
  document.getElementById('regnoDisplay').value = student.registerNumber;
  document.getElementById('updName').value = student.name;
  document.getElementById('updEmail').value = student.email;
  document.getElementById('updPhone').value = student.phone;
  document.getElementById('updDepartment').value = student.department;
  document.getElementById('updYear').value = String(student.year);
}

updateForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearMessage(updateMsg);

  if (!currentStudent) {
    showMessage(updateMsg, 'Find a student first.', 'error');
    return;
  }

  const updates = {
    name: document.getElementById('updName').value,
    email: document.getElementById('updEmail').value,
    phone: document.getElementById('updPhone').value,
    department: document.getElementById('updDepartment').value,
    year: Number(document.getElementById('updYear').value),
  };

  const result = await api('/api/students/' + document.getElementById('findRegno').value, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  if (result.ok && result.data.success) {
    currentStudent = result.data.student;
    fillForm(currentStudent);
    showMessage(updateMsg, 'Student details updated successfully.', 'success');
  } else {
    showMessage(updateMsg, result.data.message || 'Update failed. Please try again.', 'error');
  }
});
