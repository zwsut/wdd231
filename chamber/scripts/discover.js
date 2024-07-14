const fakeEvents = [
    { title: "Music Festival", description: "Join us for a night of live music and fun!" },
    { title: "Art Exhibition", description: "Discover the latest artworks from local artists." },
    { title: "Food Market", description: "Taste a variety of dishes from different cuisines." },
    { title: "Book Fair", description: "Explore new releases and meet your favorite authors." },
    { title: "Fitness Bootcamp", description: "Get fit with our outdoor bootcamp session." },
    { title: "Tech Conference", description: "Learn about the latest tech trends and network with experts." }
];

document.addEventListener('DOMContentLoaded', function() {
    const visitMessageElement = document.getElementById('welcome-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = new Date();

    if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = currentVisit - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessageElement.textContent = "You last visited 1 day ago.";
        } else {
            visitMessageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    } else {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    }

    localStorage.setItem('lastVisit', currentVisit);
});

function getRandomEvents(events, num) {
    const shuffled = events.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function populateEvents() {
    const eventsContainer = document.getElementById('discover-events');
    const randomEvents = getRandomEvents(fakeEvents, 2);

    randomEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        const eventTitle = document.createElement('h3');
        const eventDescription = document.createElement('p');

        eventTitle.textContent = event.title;
        eventDescription.textContent = event.description;

        eventDiv.appendChild(eventTitle);
        eventDiv.appendChild(eventDescription);

        eventsContainer.appendChild(eventDiv);
    });
}

document.addEventListener('DOMContentLoaded', populateEvents);

document.addEventListener('DOMContentLoaded', function() {
    const daysContainer = document.querySelector('.days');

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function populateCalendar() {
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();
        const totalDays = daysInMonth(currentMonth, currentYear);

        daysContainer.innerHTML = '';

        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            daysContainer.appendChild(dayElement);
        }
    }

    populateCalendar();
});
