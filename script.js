// Fetch superhero data from the API
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
  .then(response => response.json())
  .then(heroes => {
    displayHeroes(heroes);
  });

// Function to display heroes in the table
function displayHeroes(heroes) {
  const tableBody = document.getElementById('heroTableBody');
  tableBody.innerHTML = ''; // Clear any existing rows

  heroes.forEach(hero => {
    const row = document.createElement('tr');

    // Fill the row with hero data
    row.innerHTML = `
      <td><img src="${hero.images.xs}" alt="${hero.name}"></td>
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
}

// Helper function to format powerstats
function formatPowerstats(powerstats) {
  return Object.entries(powerstats)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
}
