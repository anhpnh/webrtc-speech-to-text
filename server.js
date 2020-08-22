let express = require("express");
let app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
let port = 3000;

app.listen(process.env.PORT || port);
console.log("Server started: " + port);


app.get("/", (req, res) => {
    res.render("trangchu");
});