const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

const usersRouter = require("./routers/usersRouter");
const carsRouter = require("./routers/carsRouter");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/users", (req, res, next) => {
//     if (123 == "1234") {
//         next();
//     } else {
//         res.send("Access denied!");
//     }
// });

app.use("/users", usersRouter);
app.use("/cars", carsRouter);

app.listen(port, () => console.log("App running at http://localhost:3000/"));
