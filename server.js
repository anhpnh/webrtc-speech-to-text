let express = require("express");
let app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
let PORT = process.env.PORT || 3000;

let server = require("http").Server(app);
let io = require("socket.io")(server);
server.listen(PORT);
console.log(`Server started ${PORT}`);

let arrUserInfo = [];

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  //nguoi-dung-dang-ki
  socket.on("nguoi-dung-dang-ki", (user) => {
    let isExist = arrUserInfo.some((e) => e.ten === user.ten);
    socket.peerID = user.peerID;
    if (isExist) {
      return socket.emit("dang-ki-that-bai", user.ten);
    }
    arrUserInfo.push(user);
    socket.emit("danh-sach-online", arrUserInfo);
    socket.broadcast.emit("co-nguoi-dung-moi", user);
  });

  //local-gui-text
  socket.on("local-gui-text", (text) => {
    socket.broadcast.emit("server-gui-text", text);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    let index = arrUserInfo.findIndex((user) => user.peerID === socket.peerID);
    arrUserInfo.splice(index, 1);
    io.emit("ai-do-ngat-ket-noi", socket.peerID);
  });
});

app.get("/", (req, res) => {
  res.render("trangchu");
});
