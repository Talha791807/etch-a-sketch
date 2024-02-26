document.addEventListener("DOMContentLoaded", function() {
    // Create initial grid
    const container = document.getElementById('container');
    console.log("Container:", container);

    // Function to create the grid
    function createGrid(numSquaresPerSide) {
        container.innerHTML = '';

        const squareSize = 960 / numSquaresPerSide;

        for (let i = 0; i < numSquaresPerSide * numSquaresPerSide; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;
            container.appendChild(square);
        }

        // Add event listeners to each square
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('mouseenter', handleMouseEnter);
        });
    }

    // Creating initial 16x16 grid
    createGrid(16);

    // Function to handle mouse enter event
    function handleMouseEnter() {
        // Get random RGB values
        const randomRed = Math.floor(Math.random() * 256);
        const randomGreen = Math.floor(Math.random() * 256);
        const randomBlue = Math.floor(Math.random() * 256);

        // Get the current background color of the square
        let currentColor = this.style.backgroundColor;
        if (!currentColor) currentColor = 'rgb(255, 255, 255)';

        // Extract RGB values from the current color
        const match = currentColor.match(/\d+/g);
        const currentRed = parseInt(match[0]);
        const currentGreen = parseInt(match[1]);
        const currentBlue = parseInt(match[2]);

        // Calculate new RGB values with progressive darkening effect
        const newRed = Math.max(currentRed - 25.5, randomRed);
        const newGreen = Math.max(currentGreen - 25.5, randomGreen);
        const newBlue = Math.max(currentBlue - 25.5, randomBlue);

        // Update the background color of the square
        this.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
    }

    // Function to reset the grid
    function resetGrid() {
        let squaresPerSide = prompt("Enter number of squares per side (maximum 100):");
        squaresPerSide = parseInt(squaresPerSide);
        if (!isNaN(squaresPerSide) && squaresPerSide > 0 && squaresPerSide <= 100) {
            createGrid(squaresPerSide);
        } else {
            alert("Invalid input. Please enter a number between 1 and 100.");
        }
    }

    // Add event listener to reset button
    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', resetGrid);
    } else {
        console.error("Reset button not found.");
    }
});
