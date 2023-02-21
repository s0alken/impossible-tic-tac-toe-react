import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

io.on('connection', socket => {

  const roomId = socket.handshake.query.roomId.toUpperCase();

  socket.join(roomId);

  console.log(`User connected to room ${roomId}`);

  const totalUsersConnected = io.sockets.adapter.rooms.get(roomId).size;

  console.log(`Total users connected to room ${roomId}: ${totalUsersConnected}`);

  if (totalUsersConnected === 2) {
    socket.to(roomId).emit('opponent-connected');
  }

  socket.on('set-opponent-mark', opponentMark => {
    socket.to(roomId).emit('opponent-mark-ready', opponentMark);
  });

  socket.on('opponent-ready', () => {
    io.to(roomId).emit('opponent-ready');
  });

  socket.on('board-update', message => {
    io.to(roomId).emit('board-update', message)
  })

  socket.on('next-round', () => {
    io.to(roomId).emit('next-round');
  })

  socket.on('game-restart', () => {
    io.to(roomId).emit('game-restart');
  })

});

server.listen(PORT, () => {
  console.log(`Running or port ${PORT}`);
});