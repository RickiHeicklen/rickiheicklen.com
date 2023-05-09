let clientId;
let gameId;
let socket;
let yourSymbol;
let game;

const connectBtn = document.getElementById('connectBtn')
const newGameBtn = document.getElementById('newGame')
const currGames = document.getElementById('currGames')
const joinGame = document.querySelector('button[type="submit"]')


const cells = document.querySelectorAll('td');
let currentPlayer = 'X';
let moves = []

connectBtn.addEventListener('click', () => {
    socket = new WebSocket('ws://localhost:8080')
    socket.onopen = function(event) {}
    newGameBtn.addEventListener('click', () => {
        const payLoad = {
            'method': 'create',
            'clientId': clientId
        }

        socket.send(JSON.stringify(payLoad))

    })

    socket.onmessage = function(msg) {
        const data = JSON.parse(msg.data)
        switch (data.method) {
            case 'connect':
                clientId = data.clientId
                userCol.innerHTML = `UserId: ${clientId}`
                userCol.classList.add('joinLabel')
                break
            case 'create':
                // inform you have successfully created the game and been added as player1
                gameId = data.game.gameId
                yourSymbol = data.game.players[0].symbol
                console.log(`game id is ${gameId} and your symbol is ${yourSymbol}`)
                cells.forEach(cell => {
                    cell.classList.remove('x')
                    cell.classList.remove('cirlce')
                })
                break

            case 'gamesAvail':
                while (currGames.firstChild) {
                    currGames.removeChild(currGames.lastChild)
                }
                const games = data.games
                games.forEach((game) => {
                    const li = document.createElement('li')
                    li.addEventListener('click', selectGame)
                    li.innerText = game
                    currGames.appendChild(li)
                })
                break
            case 'join':
                gameId = data.game.gameId
                yourSymbol = data.game.players[1].symbol
                console.log(`game id is ${gameId} and your symbol is ${yourSymbol}`)
                cells.forEach(cell => {
                    console.log(`cell classes are ${cell.classList}`)
                    cell.classList.remove('x')
                    cell.classList.remove('cirlce')

                })
                break
            case 'updateBoard':
                gameBoard.style.display = "grid"
                console.log(`game updateBoard is ${data.game.board}`)
                game = data.game
                board = game.board
                const symbolClass = yourSymbol == 'x' ? 'x' : 'circle'
                gameBoard.classList.add(symbolClass)
                index = 0
                cells.forEach(cell => {
                    if (board[index] == 'x')
                        cell.classList.add('x')
                    else if (board[index] == 'o')
                        cell.classList.add('circle')
                    else
                        cell.addEventListener('click', clickCell)
                    index++
                })

                game.players.forEach((player) => {
                    if (player.clientId == +clientId && player.isTurn == true) {
                        isTurn = true
                        console.log(`your turn`)
                    }
                })
                break

            case 'gameEnds':
                console.log(`Winner is ${data.winner}`)
                window.alert(`Winner is ${data.winner}`)
                break;
            case 'draw':
                alert('Its a draw')
                break
        }
    }

    socket.onclose = function(event) {

    }

    socket.onerror = function(err) {

    }
})

function selectGame(src) {
    gameId = +src.target.innerText
    joinGame.addEventListener('click', joingm, { once: true })
}

function joingm() {
    const payLoad = {
        'method': 'join',
        'clientId': clientId,
        'gameId': gameId
    }
    socket.send(JSON.stringify(payLoad))
}

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
