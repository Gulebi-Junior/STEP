const btn = document.querySelector("#add-car-btn");
const input = document.querySelector("#car-name-input");
const list = document.querySelector("#cars-list");

const baseURL = "http://127.0.0.1:8081/";

const loadCarsList = async () => {
    let response = await fetch(baseURL + "cars", { method: "GET" });
    let carsArr = await response.json();

    list.innerHTML = "";

    for (const { model } of carsArr) {
        list.innerHTML += `
            <li>${model}</li>
        `;
    }
};

const addCar = async (name) => {
    let response = await fetch(baseURL + "cars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { model: name },
    });

    loadCarsList();
};

btn.addEventListener("click", () => {
    addCar(input.value);
});

loadCarsList();
