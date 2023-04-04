const SERVER_URL = "http://localhost";
const API_URL = `${SERVER_URL}/api`;

export const ENTITIES = {
    BIKE: "bike",
    STORE: "store",
    STOCK: "stock",
};

async function apiRequest(method, entity, data, _id = null) {
    const url = `${API_URL}/${entity}${_id ? `/${_id}` : ""}`;
    const options = {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    try {
        let response;
        if (method === "GET") {
            response = await fetch(url);
        } else {
            response = await fetch(url, options);
        }
        if (!response.ok) {
            throw new Error(
                `${method} request failed with status ${response.status}`
            );
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function create(entity) {
    const formData = new FormData(
        document.getElementsByClassName("entity-form")[0]
    );
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    await apiRequest("POST", entity, data);
    window.location.href = `/${entity}`;
}

async function update(entity) {
    const formData = new FormData(
        document.getElementsByClassName("entity-form")[0]
    );
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    const _id = data["_id"];
    await apiRequest("PUT", entity, data, _id);
    window.location.href = `/${entity}`;
}

function createButtons(entity, item) {
    const buttons = document.createElement("div");
    buttons.classList.add("entity-buttons");
    const modifyButton = createButton(
        "Modificar",
        `${SERVER_URL}/${entity}/update?_id=${item._id.value}`
    );
    const deleteButton = createButton(
        "Eliminar",
        `${SERVER_URL}/${entity}/delete?_id=${item._id.value}`
    );
    buttons.appendChild(modifyButton);
    buttons.appendChild(deleteButton);
    return buttons;
}

function createButton(label, url) {
    const button = document.createElement("a");
    button.classList.add("entity-button");
    button.innerHTML = label;
    button.href = url;
    return button;
}

function createEntityItem(entity, item) {
    const entityItem = document.createElement("div");
    entityItem.classList.add("entity-item");

    const divImage = entity === ENTITIES.STOCK ? null : createDivImage(entity);
    const info = createInfo(item);
    const buttons = createButtons(entity, item);

    // If entity is stock, don't show image
    entity === ENTITIES.STOCK || entityItem.appendChild(divImage);
    entityItem.appendChild(info);
    entityItem.appendChild(buttons);

    return entityItem;
}

function createDivImage(entity) {
    const divImage = document.createElement("div");
    divImage.classList.add("entity-image");
    const img = document.createElement("img");
    const randomNum = Math.floor(Math.random() * 3) + 1;
    img.src = `/resources/${entity}/${randomNum}.png`;
    divImage.appendChild(img);
    return divImage;
}

function createInfo(item) {
    const info = document.createElement("div");
    info.classList.add("entity-info");
    const divProperties = document.createElement("div");
    divProperties.classList.add("entity-properties");
    for (const key in item) {
        // If value is null, show "No encontrado", else, if value has a name property, show it's value, else show value
        let value = item[key].value?.name ?? item[key].value ?? "No encontrado";

        if (key === "_id") continue;
        if (key === "__v") continue;
        if (key === "name") {
            const title = document.createElement("p");
            title.innerHTML = value;
            title.classList.add("entity-title");
            info.appendChild(title);
        } else {
            const p = document.createElement("p");
            p.classList.add("entity-property");
            p.innerHTML = `<span class="entity-key">${item[key].label}:</span>${value}`;
            divProperties.appendChild(p);
        }
    }

    info.appendChild(divProperties);
    return info;
}

function createElement(tagName, className = "") {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

function createFormElement(tagName, className) {
    const form = createElement(tagName, className);
    return form;
}

function createInputHiddenElement(key, value) {
    const input = createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value.value;
    return input;
}

function createLabelElement(key, value) {
    const label = createElement("label");
    label.htmlFor = key;
    label.textContent = `${value.label}: `;
    return label;
}

function createInputElement(key, value) {
    const input = createElement("input");
    input.type = typeof value.value === "number" ? "number" : "text";
    input.name = key;
    input.id = key;
    input.value = value.value;
    return input;
}

function createSubmitButton(data) {
    const button = createElement("button");
    button.type = "submit";
    button.textContent = data["_id"] ? "Actualizar" : "Crear";
    return button;
}

// Export functions

export async function getAll(entity) {
    return await apiRequest("GET", entity);
}

export async function getOne(entity, _id) {
    return await apiRequest("GET", entity, {}, _id);
}

export async function deleteOne(entity, _id) {
    await apiRequest("DELETE", entity, {}, _id);
    window.location.href = `/${entity}`;
}

export async function show(parent, entity, data) {
    for (const item of data) {
        const entityItem = createEntityItem(entity, item);
        parent.appendChild(entityItem);
    }
}

export async function showForm(form, entity, data) {
    const updateForm = createFormElement("form", "entity-form");

    Object.entries(data).forEach(([key, value]) => {
        if (key === "_id" || key === "__v") {
            const input = createInputHiddenElement(key, value);
            updateForm.appendChild(input);
        } else {
            const label = createLabelElement(key, value);
            const input = createInputElement(key, value);
            label.appendChild(input);
            updateForm.appendChild(label);
        }
    });

    updateForm.appendChild(createElement("br"));
    const button = createSubmitButton(data);
    updateForm.appendChild(button);

    form.appendChild(updateForm);
    updateForm.addEventListener("submit", (e) => {
        e.preventDefault();
        data["_id"] ? update(entity) : create(entity);
    });
}

export const mapToFormFields = (data, skeleton) => {
    const formFields = {};
    for (const [key, value] of Object.entries(data)) {
        if (key in skeleton) {
            formFields[key] = {
                label: skeleton[key]["label"],
                // The same -> value ? (value["_id"] ? value["_id"] : value) : value
                value: value?.["_id"] ?? value,
            };
        } else {
            formFields[key] = { label: key, value: value };
        }
    }
    return formFields;
};

export const mapToAllFormFields = (data, skeleton) => {
    const formFields = [];
    for (const item of data) {
        formFields.push(mapToFormFields(item, skeleton));
    }
    return formFields;
};