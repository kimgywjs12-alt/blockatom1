# Blueprint for Rock-Paper-Scissors Game with Teachable Machine

## Project Overview
This project will create a web-based Rock-Paper-Scissors game where the user's hand gestures are recognized using a pre-trained Teachable Machine model. The game will display the user's recognized gesture, the computer's random choice, the outcome of each round, and a persistent scoreboard.

## Current Application State
The current application is a Lotto Number Generator with dark/light mode toggle and a Formspree contact form. This new RPS game will be a separate, distinct application. I will create a new `rps.html` file as the entry point for the RPS game, and link it from `index.html` for easy access. The existing `index.html` and its associated files will remain untouched, ensuring minimal disruption to the existing functionality.

## Plan for Current Task: Integrating RPS Game with Teachable Machine

### 1. Create `rps.html` and link it from `index.html`
*   Create a new HTML file, `rps.html`, to host the RPS game.
*   Add a link to `rps.html` in `index.html` for navigation.

### 2. Basic HTML Structure for `rps.html`
*   Include necessary meta tags and title.
*   Link to a new CSS file (`rps-style.css`) and a new JavaScript file (`rps-main.js`).
*   Add elements for:
    *   Video stream from webcam (`<video>`).
    *   Canvas for displaying video or predictions.
    *   Elements to show user's prediction (Rock/Paper/Scissors).
    *   Elements to show computer's choice.
    *   Elements to display round outcome (Win/Lose/Draw).
    *   Scoreboard (Player Score, Computer Score, Draws).
    *   A button to start/stop the game.

### 3. Basic CSS Styling for `rps-style.css`
*   Initialize basic styling for the body.
*   Style the video feed, prediction display, computer choice, outcome, and scoreboard for clarity and visual appeal.
*   Incorporate theme variables for dark/light mode (optional, but good for consistency with the existing project).

### 4. Teachable Machine Model Integration (in `rps-main.js`)
*   Load TensorFlow.js and the Teachable Machine library via CDN.
*   Define the model URL (`https://teachablemachine.withgoogle.com/models/vzIPAnZ10/`).
*   Asynchronously load the model and its metadata.
*   Set up webcam access using `navigator.mediaDevices.getUserMedia`.
*   Create a loop to continuously make predictions from the video stream.
*   Map prediction probabilities to Rock, Paper, Scissors, and possibly a "Neutral" or "Waiting" state.

### 5. Game Logic (in `rps-main.js`)
*   **Game State Management:** Variables for player score, computer score, draws.
*   **Computer's Turn:** Function to randomly select Rock, Paper, or Scissors for the computer.
*   **Determine Winner:** Function to compare player's choice (from TM prediction) and computer's choice.
*   **Update UI:** Functions to update prediction display, computer choice display, outcome message, and scoreboard.
*   **Game Loop/Flow:**
    *   Start game button initiates webcam and prediction loop.
    *   When a confident prediction is made:
        *   Trigger computer's choice.
        *   Determine round winner.
        *   Update UI.
        *   Brief pause before next prediction to avoid rapid-fire rounds.

### 6. Git Workflow
*   Stage all new/modified files.
*   Commit with a descriptive message.
*   Push to remote repository.
