const http = require('http');
const { Server } = require('socket.io');

let io;

const handleChatMessage = (socket, msg) => {
  socket.rooms.forEach((room) => {
    if (room === socket.id) {
      return;
    }
    io.to(room).emit('chat message', msg);
  });
};

const handleChatMessageWithPic = (socket, msg, picId) => {
  socket.rooms.forEach((room) => {
    if (room === socket.id) {
      return;
    }
    io.to(room).emit('chat pic message', msg, picId);
  });
};

const handleWelcomeMessage = (socket) => {
  socket.rooms.forEach((room) => {
    if (room === socket.id) {
      return;
    }
    io.to(room).emit('welcome message');
  });
};

const handleRoomChange = (socket, roomName) => {
  socket.rooms.forEach((room) => {
    if (room === socket.id) {
      return;
    }
    socket.leave(room);
  });
  socket.join(roomName);
};

const socketSetup = (app) => {
  const server = http.createServer(app);
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.join('general');

    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });

    socket.on('chat message', (msg) => handleChatMessage(socket, msg));
    socket.on('chat pic message', (msg, picId) => handleChatMessageWithPic(socket, msg, picId));
    socket.on('welcome message', () => handleWelcomeMessage(socket));
    socket.on('room change', (room) => handleRoomChange(socket, room));
  });

  return server;
};

module.exports = socketSetup;
