const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", require("./routers/usersRouter"));
app.use("/cars", require("./routers/carsRouter"));

app.listen(port, () => console.log("App running at http://localhost:3000/"));
