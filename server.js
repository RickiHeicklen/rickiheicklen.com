const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);

    // Parse the incoming message as JSON
    const m = JSON.parse(message);

    // Handle the message based on the type
    switch (m.type) {
      case 'move', 'gameover', 'undo', 'reset':
        // Make a move in the game
        server.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(m);
          }
        });
        break;
      default:
        console.log('Unknown message type: ' + m.type);
        break;
     }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
