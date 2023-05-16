
const cells = document.querySelectorAll('td');
const gameStatus = document.querySelector('#game-status');
let moves = [];
let winner = null;

const socket = new WebSocket('wss://tic-tac-toe-server.herokuapp.com/');

socket.addEventListener('open', (event) => {
  console.log('WebSocket connection opened (client)');
  console.log(`WebSocket port: ${socket.port} (client)`);
});
  
socket.addEventListener('message', (event) => {
  console.log(`Received message (client): ${event.data}`);
  const m = JSON.parse(event.data);
//   console.log(`m cells: ${m.cells}`);

    switch (m.type) {
     case 'gameState':
        // Update the game state with the received move
        moves = m.data.moves;
        updateBoard();
        updateGameStatus();
        console.log(`game state (from gameState): ${m.data.moves} (client)`);
        break;
    //  case 'move':
    //     // Update the local game board based on the received move
    //     const { cellIndex, player } = m.data;
    //     moves.push(cellIndex);
    //     updateBoard();
    //     updateGameStatus();
    //     console.log(`game state (from moves): ${moves} (client)`);

    //     // send new gameState to the server
    //     const message = {
    //         type: 'gameState',
    //         data: moves
    //       };
    //       socket.send(JSON.stringify(message));

    //     break;
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
    if (moves.includes(cellIndex)) {
        return;
    }

    // get the player based on the number of moves
    currentPlayer = (moves.length % 2 == 0) ? 'X' : 'O';

    // Update the local game board based on the received move
    moves.push(cellIndex);
    updateBoard();
    updateGameStatus();
    console.log(`game state (from handleCellClick): ${moves} (client)`);

    // send new gameState to the server
    const message = {
        type: 'gameState',
        data: moves
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

    // update board based on moves
    for (i = 0; i < moves.length; i++) {
        player = (i % 2 == 0) ? 'X' : 'O';
        const c = cells[moves[i]];
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
            player = (moves.length % 2 == 0) ? 'X' : 'O';
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

// function resetButton() {
//   // Send a message to the server to reset the game
//   const message = {
//     type: 'reset',
//     data: {}
//   };
//   socket.send(JSON.stringify(message));
// }

// function undoButton() {
//     // Send a message to the server to undo the last move
//     const message = {
//         type: 'undo',
//         data: {}
//     };
//     socket.send(JSON.stringify(message));
// }








// const cells = document.querySelectorAll('td');
// const gameStatus = document.querySelector('#game-status');
// let currentPlayer = 'X';
// let moves = []

// const socket = new WebSocket('wss://tic-tac-toe-server.herokuapp.com/');

// socket.addEventListener('open', (event) => {
//     console.log('WebSocket connection opened');
//     console.log(`WebSocket port: ${socket.port}`);
//   });

// socket.addEventListener('message', (event) => {
//   console.log(`Received message: ${event.data}`);
//   // Parse the incoming message as JSON
//   const message = JSON.parse(event.data);
//   printClasses();

//   // Handle different types of messages
//   switch (message.type) {
//     case 'move':
//       // Update the local game board based on the incoming move data
//       const { cellIndex, player } = message.data;
//       const cell = cells[cellIndex];
//       if (cell.textContent !== '') {
//         return;
//       }
//       cell.textContent = player;
//       cell.classList.add(player);
//       moves.push(cell);
//       if (checkForWinner()) {
//         // alert(`${player} wins!`);
//         // resetGame();
//         gameStatus.classList.add(`${player}Wins`);
//         gameStatus.textContent = `${player} Wins!`;
//         return;
//       }
//       if (checkForTie()) {
//         // alert("It's a tie!");
//         // resetGame();
//         gameStatus.classList.add('Tie');
//         gameStatus.textContent = `It's a tie!`;
//         return;
//       }  
//       break;
//     // case 'gameover':
//     //   // Display the winner or tie message
//     //   const { winner } = message.data;
//     //   if (winner) {
//     //     alert(`${winner} wins!`);
//     //   } else {
//     //     alert("It's a tie!");
//     //   }
//     //   resetGame();
//     //   break;
//     case 'reset':
//       // Reset the game board
//       // alert('The other player has reset the game.');
//       resetGame();
//       break;
//     case 'undo':
//         // Undo the last move
//         // alert('The other player has undone their last move.');
//         undoMove();
//         break;
//     default:
//       console.log(`Unknown message type: ${message.type}`);
//   }
// });

// socket.addEventListener('close', (event) => {
//   console.log('WebSocket connection closed');
// });

// socket.addEventListener('error', (event) => {
//   console.log(`WebSocket error: ${event}`);
// });

// function handleCellClick(event) {

//     if (gameStatus.classList.contains('XWins') || gameStatus.classList.contains('OWins') || gameStatus.classList.contains('Tie')) {
//         return;
//     }
//   // Calculate the cell index based on the clicked element
//   const cellIndex = Array.from(cells).indexOf(event.target);

//   // Update the local game board
//   currentPlayer = (moves.length % 2 == 0) ? 'X' : 'O';

//   // Send a message to the server with the cell index and player ID
//   const message = {
//     type: 'move',
//     data: {
//       cellIndex,
//       player: currentPlayer
//     }
//   };
//   socket.send(JSON.stringify(message));
// //   printClasses();
// }

// // Implement game logic to check for a winner
// function checkForWinner() {
//     const winningCombinations = [
//       // Rows
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       // Columns
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       // Diagonals
//       [0, 4, 8],
//       [2, 4, 6]
//     ];
  
//     for (let i = 0; i < winningCombinations.length; i++) {
//       const [a, b, c] = winningCombinations[i];
//       if (cells[a].textContent !== '' &&
//           cells[a].textContent === cells[b].textContent &&
//           cells[b].textContent === cells[c].textContent) {
//         return true;
//       }
//     }
  
//     return false;
//   }

// // Implement game logic to check for a tie
// function checkForTie() {

//     if (checkForWinner()) {
//         return false;
//     }
//     for (let i = 0; i < cells.length; i++) {
//         if (cells[i].textContent == '') {
//             return false;
//         }
//     }
//     return true;
// }

// function resetButton() {
//   // Send a message to the server to reset the game
//   const message = {
//     type: 'reset',
//     data: {}
//   };
//   socket.send(JSON.stringify(message));
// }

// function resetGame() {
//     cells.forEach(cell => cell.textContent = '');
//     cells.forEach(cell => cell.classList.remove('X', 'O'));
//     gameStatus.textContent = '';
//     gameStatus.classList.remove('XWins', 'OWins', 'Tie');
//     currentPlayer = 'X';
//     moves = [];
//   }

// function undoButton() {
//     // Send a message to the server to undo the last move
//     const message = {
//         type: 'undo',
//         data: {}
//     };
//     socket.send(JSON.stringify(message));
// }

// function undoMove() {
//     if (moves.length == 0) {
//         return;
//     }
//     const cellToUndo = moves.pop();
//     cellToUndo.textContent = '';
//     cellToUndo.classList.remove('X', 'O');
//     gameStatus.textContent = '';
//     gameStatus.classList.remove('XWins', 'OWins', 'Tie');
// }

// function printClasses() {  
//     for (let i = 0; i < cells.length; i++) {
//         console.log(cells[i].classList);
//     }
//     console.log(gameStatus.classList);
// }

// cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// // let clientId;
// // let gameId;
// // let socket;
// // let yourSymbol;
// // let game;

// // const connectBtn = document.getElementById('connectBtn')
// // const newGameBtn = document.getElementById('newGame')
// // const currGames = document.getElementById('currGames')
// // const joinGame = document.querySelector('button[type="submit"]')

// // connectBtn.addEventListener('click', () => {
// //     socket = new WebSocket('ws://localhost:3000')
// //     socket.onopen = function(event) {}
// //     newGameBtn.addEventListener('click', () => {
// //         const payLoad = {
// //             'method': 'create',
// //             'clientId': clientId
// //         }

// //         socket.send(JSON.stringify(payLoad))

// //     })

// //     socket.onmessage = function(msg) {
// //         const data = JSON.parse(msg.data)
// //         switch (data.method) {
// //             case 'connect':
// //                 clientId = data.clientId
// //                 userCol.innerHTML = `UserId: ${clientId}`
// //                 userCol.classList.add('joinLabel')
// //                 break
// //             case 'create':
// //                 // inform you have successfully created the game and been added as player1
// //                 gameId = data.game.gameId
// //                 yourSymbol = data.game.players[0].symbol
// //                 console.log(`game id is ${gameId} and your symbol is ${yourSymbol}`)
// //                 cells.forEach(cell => {
// //                     cell.classList.remove('x')
// //                     cell.classList.remove('cirlce')
// //                 })
// //                 break

// //             case 'gamesAvail':
// //                 while (currGames.firstChild) {
// //                     currGames.removeChild(currGames.lastChild)
// //                 }
// //                 const games = data.games
// //                 games.forEach((game) => {
// //                     const li = document.createElement('li')
// //                     li.addEventListener('click', selectGame)
// //                     li.innerText = game
// //                     currGames.appendChild(li)
// //                 })
// //                 break
// //             case 'join':
// //                 gameId = data.game.gameId
// //                 yourSymbol = data.game.players[1].symbol
// //                 console.log(`game id is ${gameId} and your symbol is ${yourSymbol}`)
// //                 cells.forEach(cell => {
// //                     console.log(`cell classes are ${cell.classList}`)
// //                     cell.classList.remove('x')
// //                     cell.classList.remove('cirlce')

// //                 })
// //                 break
// //             case 'updateBoard':
// //                 gameBoard.style.display = "grid"
// //                 console.log(`game updateBoard is ${data.game.board}`)
// //                 game = data.game
// //                 board = game.board
// //                 const symbolClass = yourSymbol == 'x' ? 'x' : 'circle'
// //                 gameBoard.classList.add(symbolClass)
// //                 index = 0
// //                 cells.forEach(cell => {
// //                     if (board[index] == 'x')
// //                         cell.classList.add('x')
// //                     else if (board[index] == 'o')
// //                         cell.classList.add('circle')
// //                     else
// //                         cell.addEventListener('click', clickCell)
// //                     index++
// //                 })

// //                 game.players.forEach((player) => {
// //                     if (player.clientId == +clientId && player.isTurn == true) {
// //                         isTurn = true
// //                         console.log(`your turn`)
// //                     }
// //                 })
// //                 break

// //             case 'gameEnds':
// //                 console.log(`Winner is ${data.winner}`)
// //                 window.alert(`Winner is ${data.winner}`)
// //                 break;
// //             case 'draw':
// //                 alert('Its a draw')
// //                 break
// //         }
// //     }

// //     socket.onclose = function(event) {

// //     }

// //     socket.onerror = function(err) {

// //     }
// // })

// // function selectGame(src) {
// //     gameId = +src.target.innerText
// //     joinGame.addEventListener('click', joingm, { once: true })
// // }

// // function joingm() {
// //     const payLoad = {
// //         'method': 'join',
// //         'clientId': clientId,
// //         'gameId': gameId
// //     }
// //     socket.send(JSON.stringify(payLoad))
// // }
