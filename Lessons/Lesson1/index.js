const { readFileSync, writeFileSync } = require("fs");

let json = JSON.parse(readFileSync("./test.txt"));

json.push(Number(process.argv[2]));

writeFileSync("./test.txt", JSON.stringify(json));
