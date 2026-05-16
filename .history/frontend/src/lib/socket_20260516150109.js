import { io } from "socket.io-client";

const socket = io(
  "https://saral-chat-socket.onrender.com",
  {
    transports: ["websocket"],
  }
);

export default socket;