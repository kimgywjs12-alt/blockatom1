# Blueprint for Rock-Paper-Scissors Game with Teachable Machine

## Project Overview
This project will create a web-based Rock-Paper-Scissors game where the user's hand gestures are recognized using a pre-trained Teachable Machine model. The game will display the user's recognized gesture, the computer's random choice, the outcome of each round, and a persistent scoreboard.

## Current Application State
The current application is a Lotto Number Generator with dark/light mode toggle and a Formspree contact form. This new RPS game is a separate, distinct application. I have created a new `rps.html` file as the entry point for the RPS game, and linked it from `index.html` for easy access. The existing `index.html` and its associated files remain untouched, ensuring minimal disruption to the existing functionality.

## Plan for Current Task: Optimizing for AdSense Approval & Adding Informational Pages

### 1. Create `rps.html` and link it from `index.html` (Completed)
*   Created `rps.html` to host the RPS game.
*   Added a link to `rps.html` in `index.html` for navigation.

### 2. Basic HTML Structure for `rps.html` (Modified for Image Input, Back Button, and AdSense)
*   Included necessary meta tags and title.
*   Linked to `rps-style.css` and `rps-main.js`.
*   **Replaced `<video>` with `<input type="file" id="image-upload">` and `<img id="uploaded-image">` for image display.**
*   **Added `<canvas id="canvas" style="display:none;">` for model input.**
*   Elements to show user's prediction (Rock/Paper/Scissors).
*   Elements to show computer's choice.
*   Elements to display round outcome (Win/Lose/Draw).
*   Scoreboard (Player Score, Computer Score, Draws).
*   **Renamed button to `id="predict-btn"` with text "Predict from Image".**
*   **Added "Back to Lotto" button (`<a href="index.html" id="back-to-lotto" class="back-button">`).**
*   **Added Google AdSense script to `<head>` and a placeholder ad unit (`<div class="ad-container">`).**

### 3. Basic CSS Styling for `rps-style.css` (Modified for Image Input, Back Button, and AdSense)
*   Initialized basic styling for the body.
*   **Hid the `<video>` element.**
*   **Added styles for `#image-upload` and `#uploaded-image`.**
*   Styled prediction display, computer choice, outcome, and scoreboard.
*   Incorporated theme variables for dark/light mode.
*   **Renamed `#start-game-btn` styles to `#predict-btn`.**
*   **Added styles for `.back-button` to position it in the top left corner.**
*   **Added styles for `.ad-container`.**
*   **Added styles for `.content-section` (for About/Privacy pages).**

### 4. Teachable Machine Model Integration (in `rps-main.js`) (Modified for Image Input)
*   Loaded TensorFlow.js and the Teachable Machine library via CDN.
*   Defined the model URL (`https://teachablemachine.withgoogle.com/models/vzIPAnZ10/`).
*   Asynchronously loaded the model and its metadata.
*   **Removed webcam setup and continuous loop for predictions.**
*   **Added `handleImageUpload` function to read and display selected image, and enable `predict-btn`.**
*   **Modified `predictAndPlay` function to draw `uploadedImage` onto `canvas` and use `canvas` as input for `model.predict()`.**
*   **Prediction is now triggered by `predict-btn` click.**
*   Mapped prediction probabilities to Rock, Paper, Scissors, with a confidence threshold.

### 5. Game Logic (in `rps-main.js`) (Adapted)
*   Game State Management: Variables for player score, computer score, draws.
*   Computer's Turn: Function to randomly select Rock, Paper, or Scissors for the computer.
*   Determine Winner: Function to compare player's choice (from TM prediction) and computer's choice.
*   Update UI: Functions to update prediction display, computer choice display, outcome message, and scoreboard.
*   Game Flow:
    *   Image upload triggers `handleImageUpload` to display image and enable "Predict from Image" button.
    *   Clicking "Predict from Image" triggers `predictAndPlay`, which makes a prediction and plays a round.

### 6. Optimizing for AdSense Approval & Adding Informational Pages
*   **Created `about.html`:** Provides information about the site and its purpose.
*   **Created `privacy.html`:** Details privacy practices, data handling, and AdSense/Teachable Machine usage.
*   **Modified `index.html`:**
    *   **Added a footer with links to `about.html` and `privacy.html`.**
    *   **Added Google AdSense script to `<head>` and a placeholder ad unit (`<div class="ad-container">`).**
*   **Modified `style.css`:**
    *   **Added styles for the footer and footer links (`.footer-link`).**
    *   **Added styles for `.content-section` (used in About/Privacy pages).**
    *   **Added styles for `.ad-container`.**

### 7. Git Workflow (Pending)
*   Stage all new/modified files.
*   Commit with a descriptive message.
*   Push to remote repository.
