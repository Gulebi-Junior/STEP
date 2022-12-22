const list = document.querySelector("#cars-list");

const url = "http://localhost:3000";

async function getCars() {
    const response = await fetch(url + "/cars", { method: "GET" });
    const data = await response.json();
    list.innerHTML = "";
    for (const car of data) {
        list.innerHTML += `<li>${car.model}</li>`;
    }
}

getCars();
