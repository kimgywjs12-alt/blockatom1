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

generateBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
    addHistory(numbers);
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
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
    listItem.textContent = numbers.join(', ');
    historyList.prepend(listItem);
}
