// script.js
const usedCars = window.usedCarsData;

const app = document.getElementById('app');
const filterButton = document.getElementById('filterButton');

// Function to render the car listings
function renderCarListings(cars) {
    app.innerHTML = ''; // Clear the previous listings

    cars.forEach(car => {
        // Create a div for each car listing
        const carDiv = document.createElement('div');
        carDiv.classList.add('car-listing');

        // Create the HTML content for the car listing
        carDiv.innerHTML = `
            <h2>${car.year} ${car.make} ${car.model}</h2>
            <p>Mileage: ${car.mileage} miles</p>
            <p>Price: $${car.price}</p>
            <p>Color: ${car.color}</p>
            <p>Gas Mileage: ${car.gasMileage}</p>
        `;

        // Append the car listing to the app
        app.appendChild(carDiv);
    });
}

// Initial render of all car listings
renderCarListings(usedCars);

// Add event listener for the "Apply Filters" button
filterButton.addEventListener('click', () => {
    const filteredCars = filterCars(usedCars);
    renderCarListings(filteredCars);
});

// Function to filter the car listings
function filterCars(cars) {
    const minYear = parseInt(document.getElementById('minYear').value) || 0;
    const maxYear = parseInt(document.getElementById('maxYear').value) || Infinity;
    const make = document.getElementById('make').value;
    const maxMileage = parseInt(document.getElementById('maxMileage').value) || Infinity;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
    const selectedColors = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(input => input.value);

    const filteredCars = cars.filter(car => {
        return car.year >= minYear
            && car.year <= maxYear
            && (make === 'All' || car.make === make)
            && car.mileage <= maxMileage
            && car.price <= maxPrice
            && (selectedColors.length === 0 || selectedColors.includes(car.color));
    });

    return filteredCars;
}
