import { setYearAndLastModified, toggleMenu } from '../scripts/utils.js';

document.addEventListener("DOMContentLoaded", function() {
    setYearAndLastModified();
});

var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', toggleMenu);