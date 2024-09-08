let allHeroes = []; // Store all heroes data
let filteredHeroes = []; // Store heroes based on filters
let currentPage = 1;
let pageSize = 20; // Default page size
let sortColumn = 'name'; // Default sort column
let sortDirection = 'asc'; // Default sort direction

// Function to fetch and process superhero data
function fetchAndDisplayHeroes() {
  fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(response => response.json())
    .then(heroes => {
      allHeroes = heroes;
      applyFilters(); // Apply search, sort, and pagination
    });
}

// Function to filter, sort, and display heroes based on current state
function applyFilters() {
  // Apply search filter
  const searchTerm = document.getElementById('search').value.toLowerCase();
  filteredHeroes = allHeroes.filter(hero => hero.name.toLowerCase().includes(searchTerm));

  // Apply sorting
  sortHeroes();

  // Apply pagination
  displayHeroes();
}

// Function to display heroes in the table
function displayHeroes() {
  const tableBody = document.getElementById('heroTableBody');
  tableBody.innerHTML = ''; // Clear existing rows

  // Pagination: Calculate start and end indices
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedHeroes = filteredHeroes.slice(start, end);

  // Loop through paginated heroes and create table rows
  paginatedHeroes.forEach(hero => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${hero.images.xs}" alt="${hero.name}"  class="hero-image"></td>
      <td>${hero.name}</td>
      <td>${hero.biography.fullName || 'N/A'}</td>
      <td>${formatPowerstats(hero.powerstats)}</td>
      <td>${hero.appearance.race || 'N/A'}</td>
      <td>${hero.appearance.gender || 'N/A'}</td>
      <td>${hero.appearance.height[1] || 'N/A'}</td>
      <td>${hero.appearance.weight[1] || 'N/A'}</td>
      <td>${hero.biography.placeOfBirth || 'N/A'}</td>
      <td>${hero.biography.alignment || 'N/A'}</td>
    `;
    tableBody.appendChild(row);
  });

  // Update pagination buttons state
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage * pageSize >= filteredHeroes.length;
}

// Helper function to format powerstats 
function formatPowerstats(powerstats) {
  return Object.entries(powerstats)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
}

// Function to handle sorting
function sortHeroes() {
  filteredHeroes.sort((a, b) => {
    const aValue = getColumnValue(a, sortColumn);
    const bValue = getColumnValue(b, sortColumn);

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

// Helper function to get column value for sorting
function getColumnValue(hero, column) {
  switch (column) {
    case 'name':
      return hero.name.toLowerCase();
    case 'full_name':
      return hero.biography.fullName.toLowerCase();
    case 'race':
      return hero.appearance.race?.toLowerCase() || '';
    case 'gender':
      return hero.appearance.gender.toLowerCase();
    case 'height':
      return parseFloat(hero.appearance.height[1]);
    case 'weight':
      return parseFloat(hero.appearance.weight[1]);
    case 'place_of_birth':
      return hero.biography.placeOfBirth.toLowerCase();
    case 'alignment':
      return hero.biography.alignment.toLowerCase();
    default:
      return '';
  }
}

// Event listeners for search, pagination, and sorting
document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('pageSize').addEventListener('change', function () {
  pageSize = this.value === 'all' ? filteredHeroes.length : parseInt(this.value);
  currentPage = 1;
  applyFilters();
});
document.getElementById('prevPage').addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage--;
    displayHeroes();
  }
});
document.getElementById('nextPage').addEventListener('click', function () {
  if (currentPage * pageSize < filteredHeroes.length) {
    currentPage++;
    displayHeroes();
  }
});
document.querySelectorAll('th').forEach(header => {
  header.addEventListener('click', function () {
    const column = this.innerText.toLowerCase().replace(' ', '_');
    if (sortColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortDirection = 'asc';
    }
    applyFilters();
  });
});

// Fetch and display superheroes on page load
fetchAndDisplayHeroes();
