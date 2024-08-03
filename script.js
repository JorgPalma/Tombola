const letters = ['B', 'I', 'N', 'G', 'O'];
let numbers = [];
let drawnNumbers = [];

// Define patterns
const patterns = {
    'Line Horizontal': (grid) => {
        const row = Math.floor(Math.random() * 5);
        for (let i = 0; i < 5; i++) {
            grid[row][i] = true;
        }
    },
    'Line Vertical': (grid) => {
        const col = Math.floor(Math.random() * 5);
        for (let i = 0; i < 5; i++) {
            grid[i][col] = true;
        }
    },
    'Diagonal Left to Right': (grid) => {
        for (let i = 0; i < 5; i++) {
            grid[i][i] = true;
        }
    },
    'Diagonal Right to Left': (grid) => {
        for (let i = 0; i < 5; i++) {
            grid[i][4 - i] = true;
        }
    },
    'X Shape': (grid) => {
        for (let i = 0; i < 5; i++) {
            grid[i][i] = true;
            grid[i][4 - i] = true;
        }
    },
    'Plus Shape': (grid) => {
        const row = Math.floor(Math.random() * 5);
        const col = Math.floor(Math.random() * 5);
        for (let i = 0; i < 5; i++) {
            grid[row][i] = true;
            grid[i][col] = true;
        }
    },
    'O Shape': (grid) => {
        const rows = [1, 2, 3];
        const cols = [1, 2, 3];
        rows.forEach(row => {
            cols.forEach(col => {
                grid[row][col] = true;
            });
        });
    }
};

function generateBingoNumbers() {
    numbers = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 1; j <= 15; j++) {
            numbers.push(letters[i] + (i * 15 + j));
        }
    }
}

function drawNumber() {
    if (numbers.length === 0) {
        alert("No quedan números");
        return;
    }

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const drawnNumber = numbers.splice(randomIndex, 1)[0];
    drawnNumbers.push(drawnNumber);

    displayCurrentNumber(drawnNumber);
    updateHistory();
}

function displayCurrentNumber(number) {
    const currentNumberElement = document.getElementById('current-number');
    currentNumberElement.textContent = number;
}

function updateHistory() {
    drawnNumbers.sort((a, b) => {
        const letterA = a[0];
        const letterB = b[0];
        const numberA = parseInt(a.slice(1));
        const numberB = parseInt(b.slice(1));

        if (letterA === letterB) {
            return numberA - numberB;
        }
        return letterA.localeCompare(letterB);
    });

    const groupedNumbers = letters.reduce((acc, letter) => {
        acc[letter] = drawnNumbers.filter(num => num.startsWith(letter));
        return acc;
    }, {});

    const historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = '';

    letters.forEach(letter => {
        groupedNumbers[letter].forEach(number => {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.textContent = number;
            historyContainer.appendChild(historyItem);
        });
    });
}

function generateBingoPattern() {
    const patternContainer = document.getElementById('bingo-pattern');
    patternContainer.innerHTML = '';

    // Create a 5x5 grid
    const grid = Array.from({ length: 5 }, () => Array(5).fill(false));

    // Choose a random pattern
    const patternNames = Object.keys(patterns);
    const randomPattern = patternNames[Math.floor(Math.random() * patternNames.length)];

    // Apply the chosen pattern
    patterns[randomPattern](grid);

    // Display the pattern
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('bingo-cell');
            if (grid[i][j]) {
                cell.classList.add('filled');
            }
            patternContainer.appendChild(cell);
        }
    }
}

function resetGame() {
    generateBingoNumbers();
    drawnNumbers = [];
    document.getElementById('current-number').textContent = '';
    document.getElementById('history-container').innerHTML = '';
    generateBingoPattern();
}

document.getElementById('draw-button').addEventListener('click', drawNumber);
document.getElementById('reset-button').addEventListener('click', resetGame);

generateBingoNumbers();
generateBingoPattern();  // Initialize with a random pattern
