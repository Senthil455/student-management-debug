// Shared helpers used by all pages.

function showMessage(el, text, type) {
  el.textContent = text;
  el.className = 'message ' + type;
  el.style.display = 'block';
}

function clearMessage(el) {
  el.textContent = '';
  el.className = 'message';
  el.style.display = 'none';
}

// Small wrapper around fetch that always resolves JSON plus status info.
async function api(url, options) {
  const res = await fetch(url, options);
  let data = {};
  try {
    data = await res.json();
  } catch (err) {
    data = { success: false, message: 'Unexpected server response' };
  }
  return { ok: res.ok, status: res.status, data: data };
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
