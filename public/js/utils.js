export const ENTITIES = {
    BIKE: "bike",
    STORE: "store",
    STOCK: "stock",
};

async function apiRequest(method, entity, data, _id = null) {
    const url = `http://localhost/api/${entity}${_id ? `/${_id}` : ""}`;
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

async function createBike() {
    const formData = new FormData(
        document.getElementsByClassName("entity-form")[0]
    );
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    await apiRequest("POST", "bike", data);
    window.location.href = "/bikes";
}

async function updateBike() {
    const formData = new FormData(
        document.getElementsByClassName("entity-form")[0]
    );
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    const _id = data["_id"];
    await apiRequest("PUT", "bike", data, _id);
    window.location.href = "/bikes";
}

function createButtons(item) {
    const buttons = document.createElement("div");
    buttons.classList.add("entity-buttons");
    const modifyButton = createButton(
        "Modificar",
        `http://localhost/bikes/update?_id=${item._id}`
    );
    const deleteButton = createButton(
        "Eliminar",
        `http://localhost/bikes/delete?_id=${item._id}`
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

function createEntityItem(item) {
    const entityItem = document.createElement("div");
    entityItem.classList.add("entity-item");

    const divImage = createDivImage();
    const info = createInfo(item);
    const buttons = createButtons(item);

    entityItem.appendChild(divImage);
    entityItem.appendChild(info);
    entityItem.appendChild(buttons);

    return entityItem;
}

function createDivImage() {
    const divImage = document.createElement("div");
    divImage.classList.add("entity-image");
    const img = document.createElement("img");
    img.src = "/resources/bikes/1.png";
    divImage.appendChild(img);
    return divImage;
}

function createInfo(item) {
    const info = document.createElement("div");
    info.classList.add("entity-info");
    const divProperties = document.createElement("div");
    divProperties.classList.add("entity-properties");

    for (const key in item) {
        const value = item[key];
        if (key === "_id") {
            const title = document.createElement("p");
            title.innerHTML = value;
            title.classList.add("entity-title");
            info.appendChild(title);
        } else {
            const p = document.createElement("p");
            p.classList.add("entity-property");
            p.innerHTML = `<span class="entity-key">${key}:</span>${value}`;
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
    input.value = value;
    return input;
}

function createLabelElement(key) {
    const label = createElement("label");
    label.htmlFor = key;
    label.textContent = `${key}: `;
    return label;
}

function createInputElement(key, value) {
    const input = createElement("input");
    input.type = typeof value === "number" ? "number" : "text";
    input.name = key;
    input.id = key;
    input.value = value;
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
    window.location.href = "/bikes";
}

export async function show(parent, data) {
    for (const item of data) {
        const entityItem = createEntityItem(item);
        parent.appendChild(entityItem);
    }
}

export async function showForm(form, data) {
    const updateForm = createFormElement("form", "entity-form");

    Object.entries(data).forEach(([key, value]) => {
        if (key === "_id" || key === "__v") {
            const input = createInputHiddenElement(key, value);
            updateForm.appendChild(input);
        } else {
            const label = createLabelElement(key);
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
        data["_id"] ? updateBike() : createBike();
    });
}
