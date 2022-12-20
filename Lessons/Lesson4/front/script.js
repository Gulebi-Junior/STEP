const usersList = document.querySelector("#users-list");
const carsList = document.querySelector("#cars-list");
const addUserInput = document.querySelector("#add-user-input");
const addUserBtn = document.querySelector("#add-user-btn");
const addCarInput = document.querySelector("#add-car-input");
const addCarBtn = document.querySelector("#add-car-btn");

const url = "http://localhost:3000";

async function getUsers() {
    const response = await fetch(url + "/users", { method: "GET" });
    const data = await response.json();
    usersList.innerHTML = "";
    for (const user of data) {
        usersList.innerHTML += `<li onclick="deleteUser(${user.id})">${user.name}</li>`;
    }
}

async function getCars() {
    const response = await fetch(url + "/cars", { method: "GET" });
    const data = await response.json();
    carsList.innerHTML = "";
    for (const car of data) {
        carsList.innerHTML += `<li onclick="deleteCar(${car.id})">${car.model}</li>`;
    }
}

addUserBtn.addEventListener("click", () => {
    fetch(url + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: addUserInput.value }),
    }).then(() => {
        addUserInput.value = "";
        getUsers();
    });
});

addCarBtn.addEventListener("click", () => {
    fetch(url + "/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: addCarInput.value }),
    }).then(() => {
        addCarInput.value = "";
        getCars();
    });
});

function deleteUser(id) {
    fetch(url + "/users/" + id, { method: "DELETE" }).then(getUsers());
}

function deleteCar(id) {
    fetch(url + "/cars/" + id, { method: "DELETE" }).then(getCars());
}

getUsers();
getCars();
