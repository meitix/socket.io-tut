const express = require("express");
const http = require("http");

const app = express();
const httpServer = http.createServer(app);

app.use(express.static(__dirname + "/public"));

const port = 3000;
httpServer.listen(port, () => console.log(`server is running on port ${port}`));
