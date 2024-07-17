import { setYearAndLastModified, toggleMenu } from '../scripts/utils.js';

document.addEventListener("DOMContentLoaded", function() {
    setYearAndLastModified();

    var menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    } else {
        console.error('Menu button not found');
    }

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (userDetails) {
        document.getElementById('fname').textContent = userDetails.fname;
        document.getElementById('lname').textContent = userDetails.lname;
        document.getElementById('email').textContent = userDetails.email;
    } else {
        console.error('User details not found in localStorage');
    }
});
