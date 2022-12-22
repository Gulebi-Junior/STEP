const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const getCars = () => {
    return JSON.parse(fs.readFileSync("./cars.json", { encoding: "utf-8" }));
};

const setCars = (arr) => {
    fs.writeFileSync("./cars.json", JSON.stringify(arr));
};

app.get("/cars", (req, res) => {
    res.send(getCars());
});

app.post("/cars", (req, res) => {
    const { model } = req.body;
    const cars = getCars();
    cars.push({ id: cars.at(-1)?.id + 1 || 1, model });
    setCars(cars);

    res.status(201).send("Car added!");
});

app.put("/cars/:id", (req, res) => {
    const { model } = req.body;
    const cars = getCars();
    const changed = cars.map((car) => {
        if (car.id == req.params.id) car.model = model;
        return car;
    });
    setCars(changed);

    res.send("User changed!");
});

app.delete("/cars/:id", (req, res) => {
    const cars = getCars();
    const filtered = cars.filter((user) => user.id != req.params.id);
    setCars(filtered);

    res.send("Car deleted!");
});

app.listen(port, () => console.log("App running at http://localhost:3000/"));
