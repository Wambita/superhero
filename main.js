let heroes = [];
let currentPage = 1;
let pageSize = 20;
let sortColumn = 'name';
let sortDirection = 'asc';

// Fetch and load data
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then(response => response.json())
    .then(loadData);

function loadData(data) {
    heroes = data;
    renderTable();
    setupEventListeners();
}

function renderTable() {
    const tbody = document.querySelector('#heroTable tbody');
    tbody.innerHTML = '';

    // Get the search term and normalize it
    const searchTerm = normalizeString(document.getElementById('search').value);

    // Filter the heroes based on the normalized search term
    const filteredHeroes = heroes.filter(hero => normalizeString(hero.name).includes(searchTerm));

    const sortedHeroes = sortHeroes(filteredHeroes);

    // Pagination logic
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = pageSize === 'all' ? sortedHeroes.length : startIndex + parseInt(pageSize);
    const displayedHeroes = sortedHeroes.slice(startIndex, endIndex);

    // Render table rows
    displayedHeroes.forEach(hero => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${hero.name}</td>
            <td><img src="${hero.images.xs}" alt="${hero.name}"></td>
            <td>${hero.biography.fullName}</td>
            <td>${hero.powerstats.intelligence}</td>
            <td>${hero.powerstats.strength}</td>
            <td>${hero.powerstats.speed}</td>
            <td>${hero.powerstats.durability}</td>
            <td>${hero.powerstats.power}</td>
            <td>${hero.powerstats.combat}</td>
            <td>${hero.appearance.race || ''}</td>
            <td>${hero.appearance.gender}</td>
            <td>${hero.appearance.height[1]}</td>
            <td>${hero.appearance.weight[1]}</td>
            <td>${hero.biography.placeOfBirth}</td>
            <td>${hero.biography.alignment}</td>
        `;
        tbody.appendChild(row);
    });

    updatePagination(filteredHeroes.length);
}

// Normalize the string by removing non-alphabetic characters and extra spaces
function normalizeString(str) {
    return str
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z\s]/g, '') // Remove non-alphabetic characters
        .replace(/\s+/g, ' ') // Collapse multiple spaces into one
        .trim(); // Remove leading/trailing spaces
}

function setupEventListeners() {
    document.getElementById('search').addEventListener('input', () => {
        currentPage = 1;
        renderTable();
    });

    document.getElementById('pageSize').addEventListener('change', (e) => {
        pageSize = e.target.value;
        currentPage = 1;
        renderTable();
    });

    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    document.getElementById('nextPage').addEventListener('click', () => {
        const searchTerm = document.getElementById('search').value.trim().toLowerCase();
        const filteredHeroes = heroes.filter(hero => normalizeString(hero.name).includes(searchTerm));
        const maxPages = Math.ceil(filteredHeroes.length / pageSize);
        if (currentPage < maxPages) {
            currentPage++;
            renderTable();
        }
    });

    document.querySelectorAll('#heroTable th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }
            renderTable();
        });
    });
}

function sortHeroes(heroesToSort) {
    return heroesToSort.sort((a, b) => {
        let valueA = getNestedValue(a, sortColumn);
        let valueB = getNestedValue(b, sortColumn);

        if (valueA === undefined || valueA === null || valueA === '') return 1;
        if (valueB === undefined || valueB === null || valueB === '') return -1;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            const numA = parseFloat(valueA);
            const numB = parseFloat(valueB);
            if (!isNaN(numA) && !isNaN(numB)) {
                valueA = numA;
                valueB = numB;
            } else {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
        }

        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function updatePagination(totalItems) {
    const maxPages = pageSize === 'all' ? 1 : Math.ceil(totalItems / pageSize);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${maxPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === maxPages;
}