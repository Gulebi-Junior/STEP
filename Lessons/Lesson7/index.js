const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(__dirname + "/public"));

const getCars = () => {
    return JSON.parse(fs.readFileSync("./data/cars.json", { encoding: "utf-8" }));
};

app.get("/cars", (req, res) => {
    const { model } = req.query;

    let cars = getCars();

    if (model) {
        cars = cars.filter((car) => car.model.toLowerCase().includes(model.toLowerCase()));
    }

    res.render("cars", { cars });
});

app.listen(port, () => console.log("App running at http://localhost:3000/"));
