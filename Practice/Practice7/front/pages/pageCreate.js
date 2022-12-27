let componentsBlock = document.querySelector("#components");
let previewBlock = document.querySelector("#preview");

const URL = "http://localhost:3000";

function drawPreview() {
    let previewComponents = JSON.parse(localStorage.getItem("previewComponents"));

    previewBlock.innerHTML = "";
    for (const index in previewComponents) {
        previewBlock.innerHTML += `
            <div class="component-item">
                <p>
                    <b>${previewComponents[index].name}</b>
                </p>
                <button onclick="removeComponent(${index})">Remove</button>
            </div>
        `;
    }
}

async function loadComponents() {
    const response = await fetch(URL + "/components", { method: "GET" });
    const data = await response.json();

    localStorage.setItem("components", JSON.stringify(data));

    componentsBlock.innerHTML = "";
    for (const component of data) {
        componentsBlock.innerHTML += `
            <div class="component-item">
                <p>
                    <b>${component.name}</b>
                </p>
                <button onclick="addComponent(${component.id})">Add</button>
            </div>
        `;
    }

    drawPreview();
}

function addComponent(id) {
    const components = JSON.parse(localStorage.getItem("components"));

    const component = components.find((c) => c.id == id);

    const previewComponents = JSON.parse(localStorage.getItem("previewComponents") || "[]");
    previewComponents.push(component);

    localStorage.setItem("previewComponents", JSON.stringify(previewComponents));
    drawPreview();
}

function removeComponent(index) {
    let previewComponents = JSON.parse(localStorage.getItem("previewComponents"));
    previewComponents.splice(index, 1);

    localStorage.setItem("previewComponents", JSON.stringify(previewComponents));
    drawPreview();
}

loadComponents();
