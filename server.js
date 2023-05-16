const WebSocket = require('ws');

const server = new WebSocket.Server({ noServer: true });
// const gameState = {
//   moves: []
// };
let moves_server = [];

server.on('connection', (socket) => {
  console.log('Client connected (server)');

  // Send the current game state to the new client
  const message = {
    type: 'gameState',
    data: moves_server
  };
  // console.log('message (server): ' + JSON.stringify(message) + ' (server)');

  socket.send(JSON.stringify(message));

  socket.on('message', (data) => {
    console.log(`Received message (server): ${data}`);

    // Parse the incoming message as JSON
    const m = JSON.parse(data);

    // Handle the message based on the type
    switch (m.type) {
      case 'gameState':
        // Update the game state with the received move
        moves_server = m.data;
        // Broadcast the updated game state to all clients
        server.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
                // send new gameState to the server
            const message = {
                type: 'gameState',
                data: moves_server
              };
            client.send(JSON.stringify(message));
          }
        });
        break;          
      // case 'move':
      //   // Update the game state with the received move
      //   const { cellIndex, player } = message.data;
      //   gameState.cells[cellIndex] = player;
      //   gameState.currentPlayer = player === 'X' ? 'O' : 'X';

      //   // Broadcast the updated game state to all clients
      //   server.clients.forEach((client) => {
      //     if (client.readyState === WebSocket.OPEN) {
      //       client.send(JSON.stringify(gameState));
      //     }
      //   });
      //   break;
      // case 'reset':
      //   // Reset the game state
      //   resetGameState();
      //   // Broadcast the reset game state to all clients
      //   server.clients.forEach((client) => {
      //     if (client.readyState === WebSocket.OPEN) {
      //       client.send(JSON.stringify(gameState));
      //     }
      //   });
      //   break;
      // case 'undo':
      //   // Undo the last move
      //   undoMove();
      //   // Broadcast the updated game state to all clients
      //   server.clients.forEach((client) => {
      //     if (client.readyState === WebSocket.OPEN) {
      //       client.send(JSON.stringify(gameState));
      //     }
      //   });
      //   break;
      default:
        console.log(`Unknown message type (server): ${m.type}`);
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected (server)');
  });
});

// function resetGameState() {
//   gameState.cells = ['', '', '', '', '', '', '', '', ''];
//   gameState.currentPlayer = 'X';
// }

// function undoMove() {
//   const lastMoveIndex = gameState.cells.lastIndexOf('X');
//   if (lastMoveIndex >= 0) {
//     gameState.cells[lastMoveIndex] = '';
//     gameState.currentPlayer = 'X';
//   }
// }

const express = require('express');
const app = express();

app.use((req, res) => {
  res.send('Tic Tac Toe Server');
});

const httpServer = app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port ' + (process.env.PORT || 3000) + ' (server)');
});

httpServer.on('upgrade', (request, socket, head) => {
  server.handleUpgrade(request, socket, head, (socket) => {
    server.emit('connection', socket, request);
  });
});

// const WebSocket = require('ws');

// const server = new WebSocket.Server({ noServer: true });
// // const server = new WebSocket.Server({ port: 3000 });

// server.on('connection', (socket) => {
//   console.log('Client connected');

//   socket.on('message', (data) => {
//     console.log(`Received message: ${data}`);

//     // Parse the incoming message as JSON
//     const m = JSON.parse(data);

//     // Handle the message based on the type
//     switch (m.type) {
//       case 'move':
//       case 'gameover':
//       case 'undo':
//       case 'reset':
//         // Make a move in the game
//         server.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(m));
//             // client.send(m);
//           }
//         });
//         break;
//       default:
//         console.log('Unknown message type: ' + m.type);
//         break;
//      }
//   });

//   socket.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// const express = require('express');
// const app = express();

// app.use((req, res) => {
//   res.send('Tic Tac Toe Server');
// });

// const httpServer = app.listen(process.env.PORT || 3000, () => {
//   console.log('Server started on port ' + (process.env.PORT || 3000));
// });

// httpServer.on('upgrade', (request, socket, head) => {
//   server.handleUpgrade(request, socket, head, (socket) => {
//     server.emit('connection', socket, request);
//   });
// });