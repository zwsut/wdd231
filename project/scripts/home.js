import { setYearAndLastModified, toggleMenu } from '../scripts/utils.js';

document.addEventListener("DOMContentLoaded", function() {
    setYearAndLastModified();

    var menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    } else {
        console.error('Menu button not found');
    }

    const stockList = [
        'AAPL',
        'MSFT',
        'AMZN',
        'GOOGL',
        'TSLA',
        'META',
        'NVDA',
        'JNJ',
        'V'
    ];

    const apiKey = "OkBx9Zs6jJ0skh1OK3l9mJ6pztVSoKVX";
    const symbols = getRandomItems(stockList, 5);
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
                stockDiv.style.backgroundColor = "#f5b0b0";
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

    function getRandomItems(arr, num) {
        let shuffled = arr.slice(0);
        let i = arr.length;
        let temp, index;

        while (i--) {
            index = Math.floor(Math.random() * (i + 1));

            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }

        return shuffled.slice(0, num);
    }

    function scrollStocksHorizontally() {
        const container = document.getElementById("stocks-container");
        container.scrollLeft += 1;

        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
        }
    }

    function scrollStocksVertically() {
        const container = document.getElementById("stocks-container");
        container.scrollTop += 1;

        if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
            container.scrollTop = 0;
        }
    }

    let scrollInterval;

    function setScrollInterval() {
        if (window.innerWidth < 769) {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(scrollStocksVertically, 20);
        } else {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(scrollStocksHorizontally, 20);
        }
    }

    window.addEventListener('resize', setScrollInterval);

    setScrollInterval();

    main();
});
