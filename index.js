const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

app.use(express.static(__dirname + "/public"));

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("User connected with ID: " + socket.id);
});

const port = 3000;
httpServer.listen(port, () => console.log(`server is running on port ${port}`));
