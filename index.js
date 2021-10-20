const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
const httpServer = http.createServer(app);

app.use(express.static(__dirname + "/public"));

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("User connected with ID: " + socket.id);

  socket.on("new-message", (message, room) => {
    if (room) {
      socket.to(room).emit("new-message", message);
      return;
    }
    socket.broadcast.emit("new-message", message);
  });

  socket.on("join-room", (roomName, callback) => {
    socket.join(roomName);
    callback();
  });
});

const port = 3000;
httpServer.listen(port, () => console.log(`server is running on port ${port}`));
instrument(io, { auth: false });
