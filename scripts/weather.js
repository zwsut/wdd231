
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=5591f86b273e003d408eec2dda77795e';

apiFetch(url);

async function apiFetch(url) {
    try {
        const response = await fetch(url);

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

function displayResults(data) {
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('figcaption');

    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}
