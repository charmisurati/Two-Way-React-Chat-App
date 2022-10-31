const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen("8080", () => {
  console.log("Server Running on Port 8080...");
});

io = socket(server, { origins: '*:*'});


io.on("connection", (socket) => {
  

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(socket.id);
    console.log("user joined room:"+ data);
  })

  socket.on("send_message", (data)=>{
    console.log("send_msg", data);
    socket.to(data.room).emit("receive_message", data.content);
  })

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});
