const url = "http://localhost:3000";

async function getCars() {
    const list = document.querySelector("#cars-list");

    const response = await fetch(url + "/cars", { method: "GET" });
    const data = await response.json();
    list.innerHTML = "";
    for (const car of data) {
        list.innerHTML += `<li>
                                <input type="text" id="model-input" placeholder="Car model" value="${car.model}" />
                                <button id="save-btn" onclick="saveCar(${car.id}, event)">Save</button>
                                <button id="delete-btn" onclick="deleteCar(${car.id})">X</button>
                           </li>`;
    }
    list.innerHTML += `<li>
                           <input type="text" id="model-input" placeholder="Car model" />
                           <button id="add-btn" onclick="addCar(event)">Add</button>
                       </li>`;
}

async function saveCar(id, event) {
    const model = event.path[1].querySelector("#model-input").value;

    await fetch(url + "/cars/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model }),
    });

    getCars();
}

async function deleteCar(id) {
    await fetch(url + "/cars/" + id, { method: "DELETE" });

    getCars();
}

async function addCar(event) {
    const model = event.path[1].querySelector("#model-input").value;

    await fetch(url + "/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model }),
    });

    getCars();
}

getCars();
