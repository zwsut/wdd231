const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
      // Create a section element for each prophet
      const card = document.createElement('section');
      card.classList.add('card');
  
      // Create an h2 element for the full name
      const fullName = document.createElement('h2');
      fullName.textContent = `${prophet.name} ${prophet.lastname}`;
  
      // Create an img element for the portrait
      const portrait = document.createElement('img');
      portrait.setAttribute('src', prophet.imageurl);
      portrait.setAttribute('alt', `${prophet.name} ${prophet.lastname}`);
      portrait.setAttribute('loading', 'lazy');
      portrait.setAttribute('width', '300'); // Example width
      portrait.setAttribute('height', '400'); // Example height
  
      // Append fullName and portrait to the card section
      card.appendChild(fullName);
      card.appendChild(portrait);
  
      // Append the card section to the main element or another container
      const main = document.querySelector('main');
      main.appendChild(card);
    });
  };
  
  // Example usage:
  // Assume getProphetData() fetches data and then calls displayProphets with data.prophets
  // This is just for demonstration, actual fetch implementation may vary
  const getProphetData = async () => {
    const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      displayProphets(data.prophets);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Call getProphetData to initiate fetching and displaying prophets
  getProphetData();
  