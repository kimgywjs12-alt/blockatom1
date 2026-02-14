// Teachable Machine model URL
const URL = "https://teachablemachine.withgoogle.com/models/vzIPAnZ10/";

let model, webcam, maxPredictions;
let playerChoiceDisplay, computerChoiceDisplay, outcomeDisplay;
let playerScoreDisplay, computerScoreDisplay, drawScoreDisplay;
let startGameBtn;

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let isGameRunning = false;
let canMakeMove = true; // To prevent rapid-fire predictions

// Initialize the game
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // Get elements
    playerChoiceDisplay = document.getElementById("player-choice");
    computerChoiceDisplay = document.getElementById("computer-choice");
    outcomeDisplay = document.getElementById("outcome");
    playerScoreDisplay = document.getElementById("player-score");
    computerScoreDisplay = document.getElementById("computer-score");
    drawScoreDisplay = document.getElementById("draw-score");
    startGameBtn = document.getElementById("start-game-btn");

    // Add webcam to the DOM
    document.getElementById("webcam").appendChild(webcam.canvas);

    startGameBtn.addEventListener('click', startGame);
    updateScoreDisplay();
}

async function loop() {
    webcam.update(); // update the webcam frame
    if (isGameRunning && canMakeMove) {
        await predict();
    }
    window.requestAnimationFrame(loop);
}

// Predict user's hand gesture
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    let maxProbability = 0;
    let playerMove = "Waiting...";

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        
        if (prediction[i].probability > maxProbability && prediction[i].className !== "Background") {
            maxProbability = prediction[i].probability;
            playerMove = prediction[i].className;
        }
    }

    playerChoiceDisplay.textContent = playerMove;

    // Only proceed with game logic if prediction is confident enough and not "Waiting..."
    if (maxProbability > 0.8 && playerMove !== "Background" && playerMove !== "Waiting...") { // Adjust confidence threshold if needed
        canMakeMove = false; // Disable further moves until round is over
        playRound(playerMove);
        setTimeout(() => canMakeMove = true, 2000); // Wait 2 seconds before allowing next move
    }
}

// Game logic
function generateComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerMove) {
    const computerChoice = generateComputerChoice();
    computerChoiceDisplay.textContent = computerChoice;

    let outcome;
    if (playerMove === computerChoice) {
        outcome = "It's a draw!";
        drawScore++;
    } else if (
        (playerMove === "Rock" && computerChoice === "Scissors") ||
        (playerMove === "Paper" && computerChoice === "Rock") ||
        (playerMove === "Scissors" && computerChoice === "Paper")
    ) {
        outcome = "You win!";
        playerScore++;
    } else {
        outcome = "Computer wins!";
        computerScore++;
    }
    outcomeDisplay.textContent = outcome;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    drawScoreDisplay.textContent = drawScore;
}

function startGame() {
    isGameRunning = true;
    startGameBtn.textContent = "Game Running...";
    startGameBtn.disabled = true;
    outcomeDisplay.textContent = "Make your move!";
    playerChoiceDisplay.textContent = "Waiting...";
    computerChoiceDisplay.textContent = "Waiting...";
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    updateScoreDisplay();
}

init();
