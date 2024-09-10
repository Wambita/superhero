let heroes = []; //hold the superhero data fetched from the apii
let currentPage = 1; //tracks the  current page of resulsts being displayed . set to 1
let pageSize = 20; //no of heroes displayed per page(20)
let sortColumn = 'name'; //defautlt col used for sorting
let sortDirection = 'asc'; //order of sorting (asc/desc)

// Fetch and load data
fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json') //request data from api url
    .then(response => response.json()) //converts response form json o js object once it is received
    .then(loadData); //function is called with the feched data

function loadData(data) {
    heroes = data; //fetched data array of superhero objs  is stored  in the heroes array
    renderTable(); //render table with the heroes array
    setupEventListeners(); //set event listeners for search, pagination and sorting 
}

function renderTable() {
    const tbody = document.querySelector('#heroTable tbody'); //selects the tbody section of the hero table in the html
    tbody.innerHTML = ''; //clears  the content inside to refresh it for each render

    // Get the search term and normalize it (remove extra chars  and spaces)
    const searchTerm = normalizeString(document.getElementById('search').value);

    // Filter the heroes based on the normalized search term(only heroes whose name match the search term are included)
    const filteredHeroes = heroes.filter(hero => normalizeString(hero.name).includes(searchTerm));

    //sorts the filtered heroes based ont the  cuurent sortColumn and sortDirection
    const sortedHeroes = sortHeroes(filteredHeroes);

    // Pagination logic
    const startIndex = (currentPage - 1) * pageSize; //calculates the startng index of the  current page of heroes
    const endIndex = pageSize === 'all' ? sortedHeroes.length : startIndex + parseInt(pageSize);  //end index for  cuurent page, set to all, displays  all heroes
    const displayedHeroes = sortedHeroes.slice(startIndex, endIndex); //uses slice  to exttract the portion of heroes  for the  current page

    // Render table rows . iterates over ech hero and creates an new table row
    //each collumn td is filled with the hero informatiion
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
        tbody.appendChild(row); //apend the new table row to the table body
    });

    updatePagination(filteredHeroes.length); // update  pagination controls based  on the number of filtered heroes
}

// Normalize the string by removing non-alphabetic characters and extra spaces
//converts the string to lower case , 
function normalizeString(str) {
    return str
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z\s]/g, '') // Remove non-alphabetic characters
        .replace(/\s+/g, ' ') // Collapse multiple spaces into one
        .trim(); // Remove leading/trailing spaces
}

function setupEventListeners() {
    //adds an event listener to the search input fileld that triggers when the user  types in the search bar gets the value, resets crrent page to  1  
    //rerenders  the table
    document.getElementById('search').addEventListener('input', () => {
        currentPage = 1;
        renderTable();
    });

//adds an event lister to the search input fileld that triggers when the user chooses the value, 
//resets crrent page to 1
//rerenders the table
    document.getElementById('pageSize').addEventListener('change', (e) => {
        pageSize = e.target.value;
        currentPage = 1;
        renderTable();
    });

    //add  an event lister to previous  button to nav to the previous page if  not on page one
    //reduces current page by 1
    //rerenders the table
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    //add an eventlistener to next  button to nav to the next page if not on last page
    //add current page by 1
    //rerenders  the table
    document.getElementById('nextPage').addEventListener('click', () => {
        const searchTerm = document.getElementById('search').value.trim().toLowerCase();
        const filteredHeroes = heroes.filter(hero => normalizeString(hero.name).includes(searchTerm));
        const maxPages = Math.ceil(filteredHeroes.length / pageSize);
        if (currentPage < maxPages) {
            currentPage++;
            renderTable();
        }
    });

    //add event listener to table headers for sorting, when a col header is clicked, it sorts  
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