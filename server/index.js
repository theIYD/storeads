const app = require('./server');

// Start the server
const PORT = process.env.PORT || 3500;
let server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.ENV} mode on port ${PORT}`)
);

let io = require('socket.io')(server);
io.on('connection', (socket) => {
  // Create a room for every page which views a story
  socket.on('joinRoom', (room) => {
    socket.join(room);
    if (io.sockets.adapter.rooms[room]) {
      // Emit the count of clients in a particular room
      io.in(room).emit('currentCount', io.sockets.adapter.rooms[room].length);
    }
  });

  // Remove the client from the room
  socket.on('leaveRoom', (room) => {
    socket.leave(room);
    if (io.sockets.adapter.rooms[room]) {
      io.in(room).emit('currentCount', io.sockets.adapter.rooms[room].length);
    }
  });
});
