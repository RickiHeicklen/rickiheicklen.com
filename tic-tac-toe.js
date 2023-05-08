const cells = document.querySelectorAll('td');
let currentPlayer = 'X';
let moves = []

function handleCellClick(event) {
  currentPlayer = (moves.length % 2 == 0) ? 'X' : 'O';

  const cell = event.target; // TODO: Why does this not write on the last one?
  if (cell.textContent !== '') {
    return;
  }
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);
  moves.push(cell);

  if (checkForWinner()) {
    alert(`${currentPlayer} wins!`);
    resetGame();
    return;
  }
  if (checkForTie()) {
    alert("It's a tie!");
    resetGame();
    return;
  }
//   printClasses();
}

// Implement game logic to check for a winner
function checkForWinner() {
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (cells[a].textContent !== '' &&
          cells[a].textContent === cells[b].textContent &&
          cells[b].textContent === cells[c].textContent) {
        return true;
      }
    }
  
    return false;
  }

// Implement game logic to check for a tie
function checkForTie() {

    if (checkForWinner()) {
        return false;
    }
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent == '') {
            return false;
        }
    }
    return true;
}

function resetGame() {
  cells.forEach(cell => cell.textContent = '');
  cells.forEach(cell => cell.classList.remove('X', 'O'));
  currentPlayer = 'X';
  moves = [];
}

function undo() {
    if (moves.length == 0) {
        return;
    }
    prevPlayer = (moves.length % 2 == 0) ? 'O' : 'X';
    const cell = moves.pop();
    cell.classList.remove(prevPlayer);
    cell.textContent = '';
    // printClasses();
}

function printClasses() {  
    for (let i = 0; i < cells.length; i++) {
        console.log(cells[i].classList);
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
