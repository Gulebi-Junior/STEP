const fs = require("fs");
const express = require("express");
const router = express.Router();
const { COMPONENTS_FILE_PATH } = require("../utils");

const getComponents = () => {
    return JSON.parse(fs.readFileSync(COMPONENTS_FILE_PATH, { encoding: "utf-8" }));
};

const setComponents = (arr) => {
    fs.writeFileSync(COMPONENTS_FILE_PATH, JSON.stringify(arr));
};

router.post("/", (req, res) => {
    const { name, params, hbs, styles } = req.body;

    const components = getComponents();
    const newComponent = {
        id: components.at(-1)?.id + 1 || 1,
        name,
        params,
        hbs,
        styles,
    };

    setComponents([...components, newComponent]);

    res.status(201).send("Added");
});

module.exports = router;
