const GRID_SIZE = 9;
const SUBGRID_SIZE = 3;
const numinput = [];
let solvedGrid = []; // Store the solved grid
let timerInterval;
let seconds = 0;

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        document.getElementById("timer").innerText = `Time: ${minutes}:${String(displaySeconds).padStart(2, '0')}`;
        }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Helper function to check if placing num at grid[row][col] is valid
function isValid(grid, row, col, num) {
    for (let x = 0; x < GRID_SIZE; x++) {
        if (grid[row][x] === num || grid[x][col] === num || 
            grid[Math.floor(row / SUBGRID_SIZE) * SUBGRID_SIZE + Math.floor(x / SUBGRID_SIZE)]
            [Math.floor(col / SUBGRID_SIZE) * SUBGRID_SIZE + x % SUBGRID_SIZE] === num) {
            return false;
        }
    }
    return true;
}

// Recursive function to fill the grid using backtracking
function fillGrid(grid) {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= GRID_SIZE; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (fillGrid(grid)) {
                            return true;
                        }
                        grid[row][col] = 0; // Reset the cell if it leads to a dead end
                    }
                }
                return false; // If no number is valid, backtrack
            }
        }
    }
    return true; // Sudoku filled successfully
}

// Function to create a valid Sudoku grid
function generateSudoku() {
    let grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
    fillGrid(grid);
    return grid;
}

// Function to remove numbers from the grid to create a puzzle
function removeNumbers(grid, difficultyLevel) {
    let attempts = difficultyLevel;
    while (attempts > 0) {
        let row = Math.floor(Math.random() * GRID_SIZE);
        let col = Math.floor(Math.random() * GRID_SIZE);
        while (grid[row][col] === 0) {
            row = Math.floor(Math.random() * GRID_SIZE);
            col = Math.floor(Math.random() * GRID_SIZE);
        }
        grid[row][col] = 0; // Remove the number
        attempts--;
    }
}

// Function to generate a Sudoku puzzle with a specified difficulty
function generateSudokuPuzzle(difficultyLevel) {
    let grid = generateSudoku(); // Generate a fully solved Sudoku
    solvedGrid = grid.map(row => [...row]); // ! Store the solved grid
    removeNumbers(grid, difficultyLevel); // Remove numbers based on the difficulty level
    return grid;
}

// TODO: we add 'input' element in 'td' to access user can input value in 'null' box 
function createInput(n)
{
    const parainput = document.createElement('input');
    parainput.type = 'text';
    parainput.id = 'input_' + n;
    document.getElementById(n).appendChild(parainput);
}

// Populate the table with the generated Sudoku puzzle
function populateTable(grid) {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const cellId = row * GRID_SIZE + col + 1; // Calculate the cell ID
            const cellValue = grid[row][col];
            if (cellValue !== 0) {
                document.getElementById(cellId).innerHTML = cellValue; // Set the value if not empty
            } else {
                createInput(cellId); // Create input if empty
            }
        }
    }
}

// TODO: communicate with 'random' buttom and do random data in array (numinput)
// Generate a new Sudoku puzzle and populate the table
function generatePuzzle(difficultyLevel) {
    stopTimer();
    seconds = 0;
    removeOldRandom();
    const puzzle = generateSudokuPuzzle(difficultyLevel);
    populateTable(puzzle);
    startTimer();
    console.log(puzzle);
}
// Our Code

// TODO: Remove input field inside the parent element when removeChild is called.
function removeChild(n){
    const parent = document.getElementById(n);
    const inputElements = parent.getElementsByTagName('input');
    
    // Check if there are any input elements to remove
    if (inputElements.length > 0) {
        parent.removeChild(inputElements[inputElements.length - 1]);
    }
}

//TODO: Check the condition to remove old rander in out table
function removeOldRandom(){
    for (i = 1; i <= 81; i++)
    {
        if ( numinput[i - 1] == 0 ){
            removeChild(i);
        }else{
            document.getElementById(i).innerHTML = null;
        }
    }
}

// TODO: communicate with 'submit' buttom and do random data in array (numinput)
function myclick()
{
    removeOldRandom();
    function myclick() {
        for (let i = 1; i <= 81; i++) {
            var inputElement = document.getElementById('input_' + i);
            if (inputElement) {
                var number = inputElement.value;
                if (number) {
                    numinput[i - 1] = parseInt(number); // Store the user input
                }
            }
        }
        console.log(numinput);
    }
}