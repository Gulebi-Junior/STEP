const fs = require("fs");
const express = require("express");
const router = express.Router();

const usersFile = "./routers/users.json";

router.get("/", (req, res) => {
    res.set("Content-Type", "application/json");
    res.send(fs.readFileSync(usersFile, { encoding: "utf-8" }));
});

router.get("/:id", (req, res) => {
    res.set("Content-Type", "application/json");
    let usersArr = JSON.parse(fs.readFileSync(usersFile, { encoding: "utf-8" }));

    res.send(usersArr.find((user) => user.id == req.params.id));
});

router.post("/", (req, res) => {
    const { name } = req.body;
    let usersArr = JSON.parse(fs.readFileSync(usersFile, { encoding: "utf-8" }));

    fs.writeFileSync(usersFile, JSON.stringify([...usersArr, { id: usersArr.at(-1)?.id + 1 || 1, name }]));

    res.send(`User ${name} added`);
});

router.delete("/:id", (req, res) => {
    let usersArr = JSON.parse(fs.readFileSync(usersFile, { encoding: "utf-8" }));

    fs.writeFileSync(usersFile, JSON.stringify(usersArr.filter((user) => user.id != req.params.id)));

    res.send(`User deleted`);
});

router.delete("/", (req, res) => {
    fs.writeFileSync(usersFile, "[]");

    res.send(`Users deleted`);
});

module.exports = router;
