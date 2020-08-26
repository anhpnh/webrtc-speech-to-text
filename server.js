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

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.render("trangchu");
});
