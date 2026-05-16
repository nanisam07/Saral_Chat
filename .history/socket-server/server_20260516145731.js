const express = require("express");

const http = require("http");

const { Server } = require("socket.io");

const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on(
    "join_room",
    ({ room, username }) => {
      socket.join(room);

      users.push({
        id: socket.id,
        username,
        room,
      });

      io.to(room).emit(
        "active_users",
        users
          .filter(
            (u) => u.room === room
          )
          .map((u) => u.username)
      );
    }
  );

  socket.on(
    "send_message",
    (data) => {
      io.to(data.room).emit(
        "receive_message",
        data
      );
    }
  );

  socket.on("disconnect", () => {
    users = users.filter(
      (u) => u.id !== socket.id
    );

    io.emit(
      "active_users",
      users.map((u) => u.username)
    );

    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log(
    "Socket Server Running on 5000"
  );
});