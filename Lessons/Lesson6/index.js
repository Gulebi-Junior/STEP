const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static(__dirname + "/public"));

const getUsers = () => {
    return JSON.parse(fs.readFileSync("./users.json", { encoding: "utf-8" }));
};

const setUsers = (arr) => {
    fs.writeFileSync("./users.json", JSON.stringify(arr));
};

app.get("/users", (req, res) => {
    res.send(getUsers());
});

app.get("/users/department/:name", (req, res) => {
    const users = getUsers();
    res.send(users.filter((user) => user.department == req.params.name));
});

app.get("/users/:id", (req, res) => {
    const users = getUsers();
    const foundUser = users.find((user) => user.id == req.params.id);
    foundUser ? res.send(foundUser) : res.status(404).send("User not found!");
});

app.post("/users", (req, res) => {
    const { department, name } = req.body;
    const users = getUsers();
    users.push({ id: users.at(-1)?.id + 1 || 1, department, name });
    setUsers(users);
    res.status(201).send("User added!");
});

app.delete("/users/:id", (req, res) => {
    const users = getUsers();
    const filtered = users.filter((user) => user.id != req.params.id);
    setUsers(filtered);
    res.send(users.length != filtered.length ? "User deleted!" : "User not deleted!");
});

app.put("/users", (req, res) => {
    const { id, department, name } = req.body;
    const users = getUsers();
    const changed = users.map((user) => {
        if (user.id == id) {
            user.department = department;
            user.name = name;
        }
        return user;
    });

    setUsers(changed);

    res.send("User changed!");
});

app.listen(port, () => console.log("App running at http://localhost:3000/"));
