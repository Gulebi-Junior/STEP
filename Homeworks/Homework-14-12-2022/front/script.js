const url = "http://127.0.0.1:8081/";

async function loadCars() {
    const response = await fetch(url + "cars", { method: "GET" });
    const data = await response.json();

    const list = document.querySelector("#list");

    list.innerHTML = "";

    for (const car of data) {
        list.innerHTML += `<li><span class="model-text">${car.model}</span></li>`;
    }
}

async function addCar() {
    const payload = document.querySelector("#model-input").value;

    const response = await fetch(url + "cars", { method: "POST", body: payload });
    const data = await response.json();

    loadCars();
}

loadCars();
