require("dotenv").config();

const express = require("express");
const socketIO = require("socket.io");
let passwords = require("./passwords");

const PORT = process.env.PORT || 3001;

const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

const config = {
  cors: {
    origin: process.env.WS_CLIENT_URL,
    methods: ["GET", "POST"],
  },
};

const io = socketIO(server, config);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("passwords", passwords);
  socket.on("add_password", (password) => {
    if (
      password &&
      passwords[password] !== undefined &&
      passwords[password] === "pending"
    ) {
      passwords[password] = "accepted";
      socket.emit("accepted_password", "Password accepted");
      io.emit("passwords", passwords);
    } else {
      socket.emit("invalid_password", "Invalid Password!");
    }
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});
