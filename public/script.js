var historyContainer = document.getElementById("history");
var newMessageForm = document.getElementById("new-message-form");
var roomForm = document.getElementById("room-form");

newMessageForm.addEventListener("submit", submitNewMessage);
roomForm.addEventListener("submit", joinRoom);

function addNewMessageToHistory(message) {
  const div = document.createElement("div");
  div.innerHTML = message;
  historyContainer.appendChild(div);
}

function submitNewMessage(e) {
  e.preventDefault();
  message = e.target.elements["message"];
  addNewMessageToHistory(message.value);
  message.value = "";
}

function joinRoom(e) {
  e.preventDefault();
  const roomName = e.target.elements["room-name"].value;
  addNewMessageToHistory("Joined " + roomName);
}
