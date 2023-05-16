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
      default:
        console.log(`Unknown message type (server): ${m.type}`);
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected (server)');
  });
});

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