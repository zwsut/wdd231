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

const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=41.6&lon=-73.1&units=imperial&appid=5591f86b273e003d408eec2dda77795e';
const urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=41.6&lon=-73.1&units=imperial&appid=5591f86b273e003d408eec2dda77795e';

apiFetch(urlWeather);
apiFetch2(urlForecast);

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

    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = toTitleCase(data.weather[0].description);
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherDesc.textContent = `${desc}`;
    todayTemp.textContent = `${data.main.temp_max}`;
}

function displayResults2(data) {
    const tomorrowTemp = document.querySelector('#tomorrow-temp');
    const twoDayTemp = document.querySelector('#two-day-temp');

    tomorrowTemp.textContent = `${data.list[4].main.temp_max}`;
    twoDayTemp.textContent = `${data.list[12].main.temp_max}`;
}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }
