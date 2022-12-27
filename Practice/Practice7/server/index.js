const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

const componentsRouter = require("./routers/componentsRouter");
const pagesRouter = require("./routers/pagesRouter");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(__dirname + "/public"));

app.use("/components", componentsRouter);
app.use("/pages", pagesRouter);

app.listen(port, () => console.log("App running at http://localhost:3000/"));
