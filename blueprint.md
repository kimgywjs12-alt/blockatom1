# Blueprint for Coin Persona (Crypto MBTI) Quiz

## Project Overview
This project aims to create a web-based "Coin Persona" quiz, also referred to as a "Crypto MBTI" quiz. It will guide users through a series of questions to determine their investment personality based on dimensions like Risk, Horizon, Signal, and Portfolio. The site will be bilingual (Korean/English) and will include a theme-switching functionality, Google AdSense integration, and Google Analytics for tracking.

## Current Application State
The project currently provides the HTML structure (`index.html`) and styling (`style.css`) for the "Coin Persona" quiz. It includes header, main content area with placeholders for questions, progress bar, KPI metrics, and a side panel. Theme switching functionality is implemented in `main.js`. Informational pages (`about.html`, `privacy.html`) and Google Analytics are also integrated. The site is intended to be a quiz application, not a Rock-Paper-Scissors game.

## Plan for Current Task: Implementing the Coin Persona Quiz Logic

### 1. Define Quiz Data
*   Structure the quiz questions, answer options, and their associated impact on "Coin Persona" dimensions (Risk, Horizon, Signal, Portfolio). This data will be stored in a JavaScript object or array.

### 2. Initialize Quiz State
*   Set up initial quiz state variables: current question index, user's scores for each dimension, etc.

### 3. Render Questions and Options
*   Create functions to dynamically display the current question and its options in `index.html`'s `#content` area.
*   Handle user interaction with options (e.g., clicking on an answer).

### 4. Process User Answers
*   Update the user's scores based on the selected answer for each question.
*   Advance to the next question or determine the final result if the quiz is complete.

### 5. Update UI (Progress, KPIs)
*   Dynamically update the progress bar (`#progBar`).
*   Update the current question number (`#qNo`).
*   Potentially update the `axisHint` or other KPI elements as the quiz progresses.

### 6. Calculate and Display Results
*   Develop logic to interpret the final scores and determine the user's "Coin Persona" type.
*   Render a dedicated results screen, showing the persona type and a description.

### 7. Implement Language Switching
*   Ensure all dynamic text (questions, options, results, UI labels) can be switched between Korean and English based on the `#langSel` selection.

### 8. Quiz Reset Functionality
*   Implement the logic for the "Reset" button (`#btnResetTop`) to restart the quiz.

### 9. Git Workflow & Deployment
*   Stage all new/modified files (`main.js`, possibly `style.css` if updates are needed, and `blueprint.md`).
*   Commit with a descriptive message.
*   Push to remote repository for deployment.
