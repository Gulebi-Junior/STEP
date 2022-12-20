const http = require("http");
const fs = require("fs");

const usersArr = JSON.parse(fs.readFileSync("./users.json"));

http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });

    const urlArr = request.url.split("/");

    if (urlArr[1] == "users" && urlArr.length == 2) {
        response.end(JSON.stringify(usersArr));
    } else if (urlArr[1] == "users" && urlArr.length > 2) {
        response.end(JSON.stringify(usersArr.find((user) => user.id == urlArr[urlArr.length - 1])));
    }
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
