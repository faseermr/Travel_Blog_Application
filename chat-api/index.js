const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const dbConn = require("./api/config/dbConfig");
const server = http.createServer(app);
const chatModel = require("./api/model/chat.model");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const chatRoutes = require(`./api/routes/chat.route`);

app.use("/api/chat", chatRoutes);

let users = [];
let onlineUsers = [];
let allMessages = [];

io.on("connect", (socket) => {
  socket.on("join", (userid) => {
    // console.log("id : ", socket.id);
    // console.log("socket : ", socket);
    console.log("connected user : ", userid);
    users[userid] = socket.id;
    if (!onlineUsers.includes(userid)) {
      onlineUsers.push(userid);
    }

    socket.join("members");

    io.to("members").emit("online", onlineUsers);
  });

  socket.on("sendMsg", (data) => {
    //  console.log("sendMsg : ", data);
    chatModel.saveMessages(data);
    socket.to(users[data.reciever]).emit("messageRecieved", data);
    // //console.log("Msg : ", data);
    // console.log("user : ", onlineUsers);
  });

  socket.on("disconnect", () => {
    const findIdx = users.findIndex((val) => val == socket.id);

    if (findIdx >= 0) {
      const index = onlineUsers.indexOf(findIdx);
      return onlineUsers.splice(index, 1)[0];
    }

    console.log("Disconnect");
  });
});

const port = 5000;
server.listen(port, () => console.log(`Server Started on ${port}`));
