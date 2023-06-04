
const cells = document.querySelectorAll('td');
const gameStatus = document.querySelector('#game-status');
let moves_client = [];
let winner = null;

const socket = new WebSocket('wss://tic-tac-toe-server.herokuapp.com/');

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection opened (client)');
  console.log(`WebSocket port: ${socket.port} (client)`);
});
  
socket.addEventListener('message', (event) => {
  console.log(`Received message (client): ${event.data}`);
  const m = JSON.parse(event.data);
  console.log(`Received message (client): ${m.type}`);
  console.log(`Received message (client): ${m.data}`);

    switch (m.type) {
     case 'gameState':
        // Update the game state with the received move
        console.log(`game state (from gameState 1): ${m.data} (client)`);
        moves_client = m.data;
        updateBoard();
        updateGameStatus();
        console.log(`game state (from gameState 2): ${m.data} (client)`);
        break;
     default:
        console.log(`Unknown message type: ${m.type} (client)`);
        break;
    }
  });
  
  socket.addEventListener('close', (event) => {
    console.log('WebSocket connection closed (client)');
  });
  
  socket.addEventListener('error', (event) => {
    console.log(`WebSocket error: ${event} (client)`);
  });


  function handleCellClick(event) {
    if (
      gameStatus.classList.contains('XWins') ||
      gameStatus.classList.contains('OWins') ||
      gameStatus.classList.contains('Tie')
    ) {
      return;
    }
  
    // get the cell that was clicked on
    const cellIndex = Array.from(cells).indexOf(event.target);

    // check if the cell is already occupied
    if (moves_client.includes(cellIndex)) {
        return;
    }

    // get the player based on the number of moves
    currentPlayer = (moves_client.length % 2 == 0) ? 'X' : 'O';

    // Update the local game board based on the received move
    moves_client.push(cellIndex);
    updateBoard();
    updateGameStatus();
    console.log(`game state (from handleCellClick): ${moves_client} (client)`);

    // send new gameState to the server
    const message = {
        type: 'gameState',
        data: moves_client
    };
    socket.send(JSON.stringify(message));
  }
    
  // Helper function to update the game board based on the received cell values
  function updateBoard() {
   
    // clear board
    cells.forEach((value, index) => {
        const cell = cells[index];
        cell.textContent = '';
        cell.classList.remove('X');
        cell.classList.remove('O');
      });

      console.log(`game state (from updateBoard): ${moves_client} (client)`);
    // update board based on moves
    for (i = 0; i < moves_client.length; i++) {
        player = (i % 2 == 0) ? 'X' : 'O';
        const c = cells[moves_client[i]];
        c.textContent = player;
        c.classList.add(player);
    }
  }

  function updateGameStatus() {
        // Check for winner or tie
        if (checkForWinner()) {
            gameStatus.classList.add(`${winner}Wins`);
            gameStatus.textContent = `${winner} Wins!`;
            return;
        }
        if (checkForTie()) {
            gameStatus.classList.add('Tie');
            gameStatus.textContent = `It's a tie!`;
            return;
        }
        else {
            player = (moves_client.length % 2 == 0) ? 'X' : 'O';
            gameStatus.textContent = `It's ${player}'s turn!`;
            gameStatus.classList.remove('XWins');
            gameStatus.classList.remove('OWins');
            gameStatus.classList.remove('Tie');
        }

  }
    
  cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
  
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
        winner = cells[a].textContent;
        return true;
      }
    }
    
    winner = null;
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

function resetButton() {
  // Send a message to the server to reset the game

  const message = {
    type: 'gameState',
    data: []
  };
  socket.send(JSON.stringify(message));
}

function undoButton() {
    // Send a message to the server to reset the game
  
    moves_client.pop();
    const message = {
      type: 'gameState',
      data: moves_client
    };
    socket.send(JSON.stringify(message));
  }