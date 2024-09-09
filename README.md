
---

# Superhero Data Webpage

## Overview

This project is a web page that organizes and displays superhero data fetched from an external API. The page features:
- **Interactive search**: Filter superheroes by their names as you type.
- **Sorting**: Sort superheroes by name, full name, powerstats, race, gender, height, weight, place of birth, and alignment. Each column can toggle between ascending and descending order.
- **Pagination**: Control the number of superheroes displayed per page, with options for 10, 20, 50, 100, or all results.
- **Detail View (Bonus)**: Clicking a superhero in the table reveals their detailed information and larger images (bonus feature).
- **Custom Search Operators (Bonus)**: Use custom operators like `include`, `exclude`, and comparison operations for numerical values (e.g., height, weight).

This project was built without using any external libraries or frameworks, relying solely on vanilla HTML, CSS, and JavaScript.

## Features

1. **Fetching Data**:
   - The data is fetched from the [Superhero API](https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json) using the `fetchAndDisplayHeroes()` function in JavaScript.
   - Once fetched, the data is cached and used for sorting, filtering, and pagination.

2. **Displaying Data**:
   - The superhero data is displayed in a table with relevant columns such as:
     - Icon (small image)
     - Name
     - Full Name
     - Powerstats
     - Race
     - Gender
     - Height
     - Weight
     - Place of Birth
     - Alignment
   - Missing values are handled gracefully, appearing as "Unknown."

3. **Pagination**:
   - Select the number of superheroes per page using a `<select>` dropdown, with options for 10, 20 (default), 50, 100, or all.
   - The pagination dynamically adjusts based on the number of results and the selected page size.

4. **Interactive Search**:
   - Search superheroes by typing in their name. The search results are filtered and updated instantly as you type.

5. **Sortable Columns**:
   - All columns are sortable by clicking on the header. Sorting toggles between ascending and descending order.

6. **Bonus Features**:
   - **Custom Search Operators**: Advanced search options allow users to filter using operators like `include`, `exclude`, `greater than`, `less than`, and more.

## Getting Started

### Prerequisites
- A modern web browser that supports `fetch()` and modern JavaScript features.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/superhero-data-webpage.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd superhero-data-webpage
   ```

3. **Open the `index.html` file in your browser**:

   You can either open the file directly or use a local development server (e.g., `Live Server` in VSCode).

### File Structure

```plaintext
superhero-data-webpage/
├── index.html          # Main HTML file for the web page
├── script.js              # JavaScript code for fetching and manipulating data
└── styles.css          # CSS for styling the page
```

### Usage

1. **Search**: Start typing in the search bar to filter superheroes by their name. The search is case-insensitive and updates the table as you type.
2. **Sort**: Click on any column header to sort the data. Consecutive clicks will toggle between ascending and descending order.
3. **Pagination**: Use the dropdown to choose how many superheroes to display per page.
4. **Detail View (Bonus)**: Click on any superhero in the table to view more detailed information about them.
5. **Custom Search Operators (Bonus)**: Use special search operators to filter superheroes more precisely.

### API Reference

- The superhero data is fetched from the following endpoint:
  - [Superhero API JSON Data](https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json)

### Technologies Used

- **HTML**: Structure and layout of the webpage.
- **CSS**: Basic styling of the webpage.
- **JavaScript**: Fetching, filtering, sorting, and paginating the superhero data.

## Future Improvements

- Add even more advanced search options for filtering by powerstats or alignment.
- Implement additional bonus features like URL manipulation to save search/filter states.
- Improve the overall design and add animations for a more dynamic user experience.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
