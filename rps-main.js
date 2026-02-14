// Teachable Machine model URL
const URL = "https://teachablemachine.withgoogle.com/models/vzIPAnZ10/";

let model, maxPredictions;
let playerChoiceDisplay, computerChoiceDisplay, outcomeDisplay;
let playerScoreDisplay, computerScoreDisplay, drawScoreDisplay;
let imageUpload, uploadedImage, canvas, ctx, predictBtn;

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let isImageLoaded = false;

// Initialize the game
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // Load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Get elements
    playerChoiceDisplay = document.getElementById("player-choice");
    computerChoiceDisplay = document.getElementById("computer-choice");
    outcomeDisplay = document.getElementById("outcome");
    playerScoreDisplay = document.getElementById("player-score");
    computerScoreDisplay = document.getElementById("computer-score");
    drawScoreDisplay = document.getElementById("draw-score");
    imageUpload = document.getElementById("image-upload");
    uploadedImage = document.getElementById("uploaded-image");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    predictBtn = document.getElementById("predict-btn");

    imageUpload.addEventListener('change', handleImageUpload);
    predictBtn.addEventListener('click', predictAndPlay);

    updateScoreDisplay();
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
            playerChoiceDisplay.textContent = "Image loaded, ready to predict!";
            isImageLoaded = true;
            predictBtn.disabled = false; // Enable predict button
        };
        reader.readAsDataURL(file);
    } else {
        uploadedImage.src = "#";
        uploadedImage.style.display = 'none';
        playerChoiceDisplay.textContent = "Waiting for image...";
        isImageLoaded = false;
        predictBtn.disabled = true; // Disable predict button if no image
    }
    outcomeDisplay.textContent = "Upload an image to play!";
    computerChoiceDisplay.textContent = "Waiting...";
}

async function predictAndPlay() {
    if (!isImageLoaded) {
        alert("Please upload an image first!");
        return;
    }

    // Set canvas dimensions to match model input (e.g., 224x224 for TM Image models)
    const size = 224; // Teachable Machine models typically expect 224x224
    canvas.width = size;
    canvas.height = size;

    // Draw the uploaded image onto the canvas, scaling it to fit
    ctx.drawImage(uploadedImage, 0, 0, size, size);

    predictBtn.disabled = true; // Disable button during prediction
    playerChoiceDisplay.textContent = "Predicting...";

    const prediction = await model.predict(canvas);
    let maxProbability = 0;
    let playerMove = "Waiting...";

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className;
        
        // Exclude "Background" class if present in your model and not a valid move
        if (prediction[i].probability > maxProbability && classPrediction !== "Background") {
            maxProbability = prediction[i].probability;
            playerMove = classPrediction;
        }
    }

    // Only consider predictions above a certain confidence threshold
    if (maxProbability > 0.7) { // Adjust confidence threshold if needed
        playerChoiceDisplay.textContent = playerMove;
        playRound(playerMove);
    } else {
        playerChoiceDisplay.textContent = "Could not confidently determine move.";
        outcomeDisplay.textContent = "Please upload a clearer image.";
        computerChoiceDisplay.textContent = "Waiting...";
    }
    predictBtn.disabled = false; // Re-enable predict button
}

// Game logic
function generateComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"]; // Assuming these are the class names from your TM model
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

init();
