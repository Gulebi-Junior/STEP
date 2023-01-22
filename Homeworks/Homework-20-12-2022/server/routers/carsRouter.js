const fs = require("fs");
const express = require("express");
const router = express.Router();

const carsFile = "./routers/cars.json";

router.get("/", (req, res) => {
    res.set("Content-Type", "application/json");
    res.send(fs.readFileSync(carsFile, { encoding: "utf-8" }));
});

router.get("/", (req, res) => {
    res.set("Content-Type", "application/json");
    let carsArr = JSON.parse(fs.readFileSync(carsFile, { encoding: "utf-8" }));

    res.send(carsArr.find((car) => car.id == req.params.id));
});

router.post("/", (req, res) => {
    const { model } = req.body;
    let carsArr = JSON.parse(fs.readFileSync(carsFile, { encoding: "utf-8" }));

    fs.writeFileSync(carsFile, JSON.stringify([...carsArr, { id: carsArr.at(-1)?.id + 1 || 1, model }]));

    res.send(`Car ${model} added`);
});

router.delete("/:id", (req, res) => {
    let carsArr = JSON.parse(fs.readFileSync(carsFile, { encoding: "utf-8" }));

    fs.writeFileSync(carsFile, JSON.stringify(carsArr.filter((car) => car.id != req.params.id)));

    res.send(`Car deleted`);
});

router.delete("/", (req, res) => {
    fs.writeFileSync(carsFile, "[]");

    res.send(`Cars deleted`);
});

module.exports = router;
