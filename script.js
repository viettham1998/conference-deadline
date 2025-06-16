let allConferences = [];

function daysLeft(targetDateStr) {
  const today = new Date();
  const targetDate = new Date(targetDateStr);
  const diff = targetDate - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days >= 0 ? `${days} ngày` : 'Đã diễn ra';
}

function renderTables() {
  const rankFilter = document.getElementById('rankFilter').value;
  const sortOrder = document.getElementById('sortOrder').value;
  const upcomingBody = document.querySelector('#upcomingTable tbody');
  const pastBody = document.querySelector('#pastTable tbody');

  // Clear
  upcomingBody.innerHTML = '';
  pastBody.innerHTML = '';

  // Filter & sort
  let filtered = [...allConferences];

  if (rankFilter !== 'All') {
    filtered = filtered.filter(item => item.rank === rankFilter);
  }

  filtered.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const today = new Date();

  filtered.forEach(item => {
    const row = document.createElement('tr');
    const remaining = daysLeft(item.date);
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.rank}</td>
      <td>${item.date}</td>
      <td>${item.location}</td>
      <td>${remaining}</td>
    `;
    if (new Date(item.date) >= today) {
      upcomingBody.appendChild(row);
    } else {
      pastBody.appendChild(row);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  allConferences = conferences;
  renderTables();

  document.getElementById('rankFilter').addEventListener('change', renderTables);
  document.getElementById('sortOrder').addEventListener('change', renderTables);
});
