const form = document.getElementById('registerForm');
const msg = document.getElementById('formMessage');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearMessage(msg);

  const registerNumber = document.getElementById('regno').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const department = document.getElementById('department').value;
  const year = document.getElementById('year').value;

  if (registerNumber.trim() === '') {
    showMessage(msg, 'Register number is required.', 'error');
    return;
  }
  if (email.trim() === '') {
    showMessage(msg, 'Email is required.', 'error');
    return;
  }
  if (isNaN(Number(phone))) {
    showMessage(msg, 'Phone number must be a number.', 'error');
    return;
  }
  if (department === '') {
    showMessage(msg, 'Please select a department.', 'error');
    return;
  }
  if (year === '') {
    showMessage(msg, 'Please select a year.', 'error');
    return;
  }

  const result = await api('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ registerNumber: registerNumber, studentName: name, emailId: email, mobileNo: phone, branch: department, studyYear: Number(year) }),
  });

  showMessage(msg, 'Student added successfully!', 'success');
  form.reset();
});
