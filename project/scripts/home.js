import { setYearAndLastModified, toggleMenu } from '../scripts/utils.js';

document.addEventListener("DOMContentLoaded", function() {
    setYearAndLastModified();
});

var menuButton = document.getElementById('menu-button');
menuButton.addEventListener('click', toggleMenu);

const apiKey = "OkBx9Zs6jJ0skh1OK3l9mJ6pztVSoKVX";
const symbols = ["TSLA", "AAPL", "MSFT"];
const apiUrl = `https://financialmodelingprep.com/api/v3/quote/${symbols.join()}?apikey=${apiKey}`;

async function fetchStockData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
    }
}

function displayStockData(stockData) {
    const stocksContainer = document.getElementById("stocks-container");

    stockData.forEach(stock => {
        const { symbol, name, price, changesPercentage } = stock;

        const stockDiv = document.createElement("div");
        stockDiv.classList.add("stock-box");

        if (changesPercentage > 0) {
            stockDiv.style.backgroundColor = "rgb(164, 255, 160)";
        } else if (changesPercentage < 0) {
            stockDiv.style.backgroundColor = "rgb(255, 149, 145)";
        }

        stockDiv.innerHTML = `
            <div><strong>Symbol:</strong> ${symbol}</div>
            <div><strong>Name:</strong> ${name}</div>
            <div><strong>Price:</strong> $${price}</div>
            <div><strong>Change (%):</strong> ${changesPercentage}%</div>
        `;

        stocksContainer.appendChild(stockDiv);
    });
}

async function main() {
    const stockData = await fetchStockData(apiUrl);
    if (stockData) {
        displayStockData(stockData);
    } else {
        console.error('Failed to fetch stock data.');
    }
}

main();