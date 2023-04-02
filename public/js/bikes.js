import * as utils from "./utils.js";
const BIKE_FORM_FIELDS = {
    brakes: "",
    category: "",
    clearance: "",
    drivetrain: "",
    fork: "",
    frame: "",
    front_travel: "",
    groupset: "",
    msrp: 0,
    seatpost: "",
    spec_level: "",
    suspension: "",
    weight: "",
    wheel_size: "",
    wheels: "",
};

async function getBikes() {
    return await utils.getAll(utils.ENTITIES.BIKE);
}

async function getBike(_id) {
    return await utils.getOne(utils.ENTITIES.BIKE, _id);
}

const form = document.getElementsByClassName("entity-form-container")[0];
async function showForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get("_id");
    let isUpdate = _id;
    const data = isUpdate ? await getBike(_id) : BIKE_FORM_FIELDS;

    let updateForm = document.createElement("form");
    updateForm.classList.add("entity-form");

    for (const key in data) {
        const e = data[key];
        if (key == "_id" || key == "__v") {
            let input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", key);
            input.setAttribute("value", e);
            updateForm.appendChild(input);
        } else {
            let label = document.createElement("label");
            label.setAttribute("for", key);
            label.innerHTML = `${key}: `;
            let input = document.createElement("input");
            input.setAttribute(
                "type",
                typeof e == "number" ? "number" : "text"
            );
            input.setAttribute("name", key);
            input.setAttribute("id", key);
            input.setAttribute("value", e);
            label.appendChild(input);
            updateForm.appendChild(label);
        }
    }
    let br = document.createElement("br");
    updateForm.appendChild(br);
    let button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = isUpdate ? "Actualizar" : "Crear";
    updateForm.appendChild(button);
    form.appendChild(updateForm);
    updateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        isUpdate ? updateBike() : createBike();
    });
}

function createBike() {
    const formData = new FormData(
        document.getElementsByClassName("entity-form")[0]
    );
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    fetch("http://localhost/api/bike", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok)
            throw new Error(
                `POST request failed with status ${response.status}`
            );
        window.location.href = "/bikes";
    });
}

function updateBike() {
    const formData = new FormData(form[0]);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    fetch(`http://localhost/api/bike/${data["_id"]}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok)
            throw new Error(
                `PUT request failed with status ${response.status}`
            );
        window.location.href = "/bikes";
    });
}

const entitiesContainer =
    document.getElementsByClassName("entities-container")[0];

const deleteElement = document.getElementsByClassName("entity-delete")[0];
async function deleteBike() {
    let data = await getBikes();
    let id = new URLSearchParams(window.location.search).get("_id");
    fetch(`http://localhost/api/bike/${id}`, {
        method: "DELETE",
    }).then((response) => {
        if (!response.ok)
            throw new Error(
                `DELETE request failed with status ${response.status}`
            );
        window.location.href = "/bikes";
    });
}

if (entitiesContainer) utils.show(entitiesContainer, await getBikes());
if (form) showForm();
if (deleteElement) deleteBike();
