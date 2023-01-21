const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const urlArr = req.url.split("/");

    if (urlArr[1] === "cars") {
        if (req.method === "GET") {
            res.end(fs.readFileSync("./cars.json", { encoding: "utf-8" }));
        } else if (req.method === "POST") {
            const carsArr = JSON.parse(fs.readFileSync("./cars.json", { encoding: "utf-8" }));

            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                carsArr.push({ id: carsArr.length + 1, model: body });
                fs.writeFileSync("./cars.json", JSON.stringify(carsArr));

                res.end("Success");
            });
        }
    }
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
