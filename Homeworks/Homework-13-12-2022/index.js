const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    const urlArr = request.url.split("/");

    if (urlArr[1] === "users") {
        if (urlArr[2] === "count") {
            response.end(String(JSON.parse(fs.readFileSync("./users.json")).length));
        } else if (urlArr[2] === "delete") {
            let deleteEl = Number(urlArr[3]);
            let parsedArr = JSON.parse(fs.readFileSync("./users.json"));
            let filteredArr = parsedArr.filter((el) => el.id != deleteEl);

            fs.writeFileSync("./users.json", JSON.stringify(filteredArr));

            response.end(parsedArr.length != filteredArr.length ? "User deleted" : "User not deleted");
        }
    }
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
