import { setYearAndLastModified, toggleMenu } from '../scripts/utils.js';

document.addEventListener("DOMContentLoaded", function() {
    setYearAndLastModified();
    displayStockList();

    document.getElementById('grid-view').addEventListener('click', function() {
        document.getElementById('stocks-container').classList.remove('list-view');
        document.getElementById('stocks-container').classList.add('grid-view');
    });

    document.getElementById('list-view').addEventListener('click', function() {
        document.getElementById('stocks-container').classList.remove('grid-view');
        document.getElementById('stocks-container').classList.add('list-view');
    });
});

var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', toggleMenu);

const apiKey = "OkBx9Zs6jJ0skh1OK3l9mJ6pztVSoKVX";

document.getElementById('stock-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addStock();
});

function addStock() {
    const symbol = document.getElementById('symbol').value.toUpperCase();
    const stockList = getStockList();

    if (!stockList.includes(symbol)) {
        stockList.push(symbol);
        localStorage.setItem('stockList', JSON.stringify(stockList));
        displayStockList();
    }
}

function getStockList() {
    const stockList = localStorage.getItem('stockList');
    return stockList ? JSON.parse(stockList) : [];
}

async function fetchStockData(symbol) {
    const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

function displayStockList() {
    const stockList = getStockList();
    const stocksContainer = document.getElementById('stocks-container');
    stocksContainer.innerHTML = '';

    stockList.forEach(async (symbol) => {
        const stockData = await fetchStockData(symbol);
        if (stockData) {
            displayStockData(stockData);
        }
    });
}

function displayStockData(stock) {
    const { symbol, name, price, changesPercentage } = stock;
    const stocksContainer = document.getElementById('stocks-container');

    const stockDiv = document.createElement("div");
    stockDiv.classList.add("stock-box");

    if (stocksContainer.classList.contains('list-view')) {
        stockDiv.classList.add("list-item");
    }

    if (changesPercentage > 0) {
        stockDiv.style.backgroundColor = "rgb(164, 255, 160)";
    } else if (changesPercentage < 0) {
        stockDiv.style.backgroundColor = "#f5b0b0";
    }

    stockDiv.innerHTML = `
        <div><strong>Symbol:</strong> ${symbol}</div>
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Price:</strong> $${price}</div>
        <div><strong>Change (%):</strong> ${changesPercentage.toFixed(2)}%</div>
        <button class="remove-button" data-symbol="${symbol}">Remove</button>
    `;

    stocksContainer.appendChild(stockDiv);

    stockDiv.querySelector('.remove-button').addEventListener('click', function() {
        removeStock(symbol);
    });
}

function removeStock(symbol) {
    let stockList = getStockList();
    stockList = stockList.filter(stock => stock !== symbol);
    localStorage.setItem('stockList', JSON.stringify(stockList));
    displayStockList();
}
