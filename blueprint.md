# Lotto Number Generator

## Overview

This project is a web-based application that allows users to generate random lottery numbers. The application will feature a clean, modern, and mobile-responsive design, providing an intuitive and engaging user experience.

## Features

*   **Random Number Generation:** Generates a set of 6 unique numbers between 1 and 45.
*   **Number Display:** Displays the generated numbers in a visually appealing format.
*   **History:** Keeps a record of previously generated number sets.
*   **Responsive Design:** Adapts to various screen sizes for a seamless experience on desktop and mobile devices.

## Design and Style

*   **Layout:** A centered, card-based layout for the main application.
*   **Color Palette:** A vibrant and energetic color scheme using modern color spaces (`oklch`).
*   **Typography:** Expressive and clear typography to enhance readability.
*   **Visual Effects:** Subtle animations and drop shadows to create a sense of depth and interactivity.
*   **Iconography:** Icons will be used to improve usability and visual appeal.

## Plan

1.  **HTML (`index.html`):**
    *   Set up the basic structure of the application, including a container for the lottery machine, a display for the numbers, a button to generate numbers, and a section for the history.
    *   Use a `<template>` for a lottery ball web component.

2.  **CSS (`style.css`):**
    *   Style the main container, number display, button, and history section.
    *   Implement a responsive design using media queries.
    *   Use CSS variables for colors and other properties.
    *   Add animations for the number generation.

3.  **JavaScript (`main.js`):**
    *   Create a custom element `lotto-ball` for displaying individual numbers.
    *   Implement the logic for generating unique random numbers.
    *   Add an event listener to the "Generate" button.
    *   Update the display with the new numbers when the button is clicked.
    *   Store and display a history of generated numbers.
