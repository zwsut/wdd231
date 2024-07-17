import { setYearAndLastModified, toggleMenu } from '../scripts/utils.js';

document.addEventListener("DOMContentLoaded", function() {
    setYearAndLastModified();
});

var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', toggleMenu);

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('registered')) {
        displayStockList();
    } else {
        document.getElementById('user-registration').addEventListener('submit', function(event) {
            event.preventDefault();
            registerUser();
        });
    }

    const unregisterButton = document.getElementById('unregister-button');
    if (unregisterButton) {
        unregisterButton.addEventListener('click', unregisterUser);
    }
});

function registerUser() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;

    localStorage.setItem('registered', 'true');
    localStorage.setItem('userDetails', JSON.stringify({ fname, lname, email }));

    window.location.href = 'thankyou.html';
}

function unregisterUser() {
    console.log('Unregister button clicked');

    localStorage.removeItem('registered');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('stocks');

    console.log('registered:', localStorage.getItem('registered'));
    console.log('userDetails:', localStorage.getItem('userDetails'));
    console.log('stocks:', localStorage.getItem('stocks'));

    window.location.reload();
}

function displayStockList() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log('User Details:', userDetails);
}
