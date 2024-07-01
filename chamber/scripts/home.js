const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=41.6&lon=-73.1&units=imperial&appid=5591f86b273e003d408eec2dda77795e';
const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=41.6&lon=-73.1&units=imperial&appid=5591f86b273e003d408eec2dda77795e';
const dayIndex = [
    {1:'Monday'},
    {2:'Teusday'},
    {3:'Wednesday'},
    {4:'Thursday'},
    {5:'Friday'},
    {6:'Saturday'},
    {7:'Sunday'},
]
const fakeEvents = [
    { title: "Music Festival", description: "Join us for a night of live music and fun!" },
    { title: "Art Exhibition", description: "Discover the latest artworks from local artists." },
    { title: "Food Market", description: "Taste a variety of dishes from different cuisines." },
    { title: "Book Fair", description: "Explore new releases and meet your favorite authors." },
    { title: "Fitness Bootcamp", description: "Get fit with our outdoor bootcamp session." },
    { title: "Tech Conference", description: "Learn about the latest tech trends and network with experts." }
];

const eventsContainer = document.getElementById('events');

// Creating Cards for events
fakeEvents.forEach(event => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `<h3>${event.title}</h3><p>${event.description}</p>`;
    eventsContainer.appendChild(eventElement);
    
});

// Function to scroll events
function autoScroll() {
    const eventsContainer = document.getElementById('events');
    let scrollAmount = 0;
    const slideTimer = setInterval(function() {
        eventsContainer.scrollLeft += 2;
        scrollAmount += 2;
        if (scrollAmount >= eventsContainer.scrollWidth - eventsContainer.clientWidth) {
            scrollAmount = 0;
            eventsContainer.scrollLeft = 0;
        }
    }, 40);
}

window.onload = autoScroll;

// Function to capitalize weather description
function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

// Gets name of day in week to display in forecast
function getDayName(index) {
    const dayObject = dayIndex.find(day => day[index]);
    return dayObject ? dayObject[index] : null;
}

// Hamburger menu functionality
function toggleMenu() {
    var nav = document.querySelector('nav');
    nav.classList.toggle('active');

    var ul = nav.querySelector('ul');
    if (nav.classList.contains('active')) {
        ul.style.maxHeight = ul.scrollHeight + 'px';
    } else {
        ul.style.maxHeight = '0';
    }
}

// Next 4 functions are api fetching and displaying data 
async function apiFetch(url) {
    try {
        const response = await fetch(urlWeather);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error(error);
    }
}

async function apiFetch2(url) {
    try {
        const response = await fetch(urlForecast);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults2(data);
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayResults(data) {
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const weatherDesc = document.querySelector('#weather-desc');
    const todayTemp = document.querySelector('#today-temp');

    currentTemp.innerHTML = `<strong>Temperature: </strong>${data.main.temp}&deg;F`;

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = `<strong>Condition: </strong> ${toTitleCase(data.weather[0].description)}`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherDesc.innerHTML = `${desc}`;
    todayTemp.innerHTML = `<strong>Today:</strong> ${data.main.temp_max}°F`;
}

function displayResults2(data) {
    const tomorrowTemp = document.querySelector('#tomorrow-temp');
    const twoDayTemp = document.querySelector('#two-day-temp');

    const date = new Date();
    const day= date.getDay();
    console.log('Today is ' + getDayName(day));

    tomorrowTemp.innerHTML = `<strong>${getDayName(day+1)}: </strong> ${getTomorrowTempAt15(data)}°F`;
    twoDayTemp.innerHTML = `<strong>${getDayName((day+2)%7)}: </strong> ${getTwoDayTempAt15(data)}°F`;


    // Functions to get temperateure at 3:00 PM on next two days.
    // I'm estimating this will be roughly the hottest it will be during those days
    function getTomorrowTempAt15(data) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDateString = tomorrow.toISOString().split('T')[0];
        const targetTime = "15:00:00";
    
        for (const forecast of data.list) {
            if (forecast.dt_txt.startsWith(tomorrowDateString) && forecast.dt_txt.endsWith(targetTime)) {
                return forecast.main.temp;
            }
        }
    
        return null;
    }
    
    function getTwoDayTempAt15(data) {
        const twoDay = new Date();
        twoDay.setDate(twoDay.getDate() + 2);
        const twoDayDateString = twoDay.toISOString().split('T')[0];
        const targetTime = "15:00:00";
    
        for (const forecast of data.list) {
            if (forecast.dt_txt.startsWith(twoDayDateString) && forecast.dt_txt.endsWith(targetTime)) {
                return forecast.main.temp;
            }
        }
    
        return null;
    }
}

// Function to generate business cards randomly from JSON members file, membership levels 2 and 3
async function populateSpotlightsFromJSON() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        const filteredData = data.filter(item => item.membershipLevel === 2 || item.membershipLevel === 3);

        shuffleArray(filteredData);

        const selectedItems = filteredData.slice(0, 3);

        const spotlightsContainer = document.getElementById('spotlights');

        spotlightsContainer.innerHTML = '';

        selectedItems.forEach(item => {
            const spotlightElement = document.createElement('div');
            spotlightElement.classList.add('spotlight');

            spotlightElement.innerHTML = `
                <img src="images/${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p><strong>Address:</strong> ${item.address}</p>
                <p><strong>Phone:</strong> ${item.phone}</p>
                <p><strong>Website:</strong> <a href="${item.website}" target="_blank">${item.website}</a></p>
                <p><strong>Membership Level:</strong> ${item.membershipLevel}</p>
                <p>${item.otherInfo}</p>
            `;

            spotlightsContainer.appendChild(spotlightElement);
        });

    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


populateSpotlightsFromJSON();

apiFetch(urlWeather);
apiFetch2(urlForecast);



