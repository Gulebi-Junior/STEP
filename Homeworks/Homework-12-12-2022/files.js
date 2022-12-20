const fs = require("fs");

const getFirstWord = (fileName) => {
    return fs.readFileSync(fileName, { encoding: "utf-8" }).split(" ")[0];
};

const getLastWord = (fileName) => {
    return fs.readFileSync(fileName, { encoding: "utf-8" }).split(" ").reverse()[0];
};

module.exports = { getFirstWord, getLastWord };
