const createBtn = document.querySelector("#create-btn");

const URL = "http://localhost:3000";

createBtn.addEventListener("click", () => {
    const name = document.querySelector("#name-input").value;
    const params = document.querySelector("#params-input").value;
    const hbs = document.querySelector("#hbs-input").value;
    const styles = document.querySelector("#style-input").value;

    const payload = { name, params, hbs, styles };

    fetch(URL + "/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
});
