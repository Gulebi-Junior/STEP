const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

const getUsers = () => {
    return JSON.parse(fs.readFileSync("./data/users.json", { encoding: "utf-8" }));
};

app.get("/users", (req, res) => {
    const users = getUsers();

    res.render("users", { users });
});

app.listen(port, () => console.log("App running at http://localhost:3000/"));
