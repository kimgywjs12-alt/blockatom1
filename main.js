class LottoBall extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('lotto-ball-template').content;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.lotto-ball').textContent = this.getAttribute('number');
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const numberDisplay = document.querySelector('.number-display');
const historyList = document.getElementById('history-list');
const themeToggleText = document.getElementById('theme-toggle-text'); // Changed to themeToggleText

// Theme switching logic
function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
    themeToggleText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode'; // Update text
}

themeToggleText.addEventListener('click', () => { // Changed event listener
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme); // Set theme and update text on load


generateBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
    addHistory(numbers);
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 5) { // Changed from 6 to 5
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    numberDisplay.innerHTML = '';
    numbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        numberDisplay.appendChild(lottoBall);
    });
}

function addHistory(numbers) {
    const listItem = document.createElement('li');
    
    // Create a div to hold the lotto balls for history
    const historyNumbersDiv = document.createElement('div');
    historyNumbersDiv.classList.add('history-numbers');

    numbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        historyNumbersDiv.appendChild(lottoBall);
    });

    listItem.appendChild(historyNumbersDiv);
    historyList.prepend(listItem);
}
