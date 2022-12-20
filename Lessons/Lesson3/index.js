const http = require("http");
const fs = require("fs");

http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");

    if (request.url === "/cars") {
        if (request.method === "POST") {
            let data = "";

            request.on("data", (chunk) => {
                data += chunk;
            });

            request.on("end", () => {
                console.log(data);

                const { model } = JSON.parse(data);

                let carsArr = JSON.parse(fs.readFileSync("./cars.json"));

                carsArr.push({
                    id: carsArr.length + 1,
                    model,
                });

                fs.writeFileSync("./cars.json", JSON.stringify(carsArr));

                response.end(`Car ${model} added`);
            });
        } else if (request.method === "GET") {
            response.end(fs.readFileSync("./cars.json"));
        }
    } else {
        response.end("Hello");
    }
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081/");
