var historyContainer = document.getElementById("history");
var newMessageForm = document.getElementById("new-message-form");
var roomForm = document.getElementById("room-form");

newMessageForm.addEventListener("submit", submitNewMessage);
roomForm.addEventListener("submit", joinRoom);

var room;

var socket = io();
socket.on("connect", function () {
  addNewMessageToHistory("You are connected with ID: " + socket.id);
});

var dashboardSocket = io("http://localhost:3000/dashboard", {
  auth: { token: "mahdi" },
});

dashboardSocket.on("connect", function () {
  addNewMessageToHistory(
    "You are connected to Dashboard with ID: " + dashboardSocket.id
  );
});

dashboardSocket.on("connect_error", addNewMessageToHistory);

socket.on("new-message", addNewMessageToHistory);

function addNewMessageToHistory(message) {
  const div = document.createElement("div");
  div.innerHTML = message;
  historyContainer.appendChild(div);
}

function submitNewMessage(e) {
  e.preventDefault();
  message = e.target.elements["message"];
  addNewMessageToHistory(message.value);
  socket.emit("new-message", message.value, room);
  message.value = "";
}

function joinRoom(e) {
  e.preventDefault();
  const roomName = e.target.elements["room-name"].value;
  socket.emit("join-room", roomName, () => {
    room = roomName;
    addNewMessageToHistory("Joined " + roomName);
  });
}
