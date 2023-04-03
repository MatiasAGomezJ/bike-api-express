export const ENTITIES = {
    BIKE: "bike",
    STORE: "store",
    STOCK: "stock",
};

export async function getAll(entity) {
    try {
        let response = await fetch(`http://localhost/api/${entity}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getOne(entity, _id) {
    try {
        let response = await fetch(`http://localhost/api/${entity}/${_id}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function show(parent, data) {
    data.forEach((item) => {
        let divImage = document.createElement("div");
        divImage.classList.add("entity-image");
        let img = document.createElement("img");
        img.src = "/resources/bikes/1.png";
        divImage.appendChild(img);

        let info = document.createElement("div");
        info.classList.add("entity-info");
        let divProperties = document.createElement("div");
        divProperties.classList.add("entity-properties");

        for (const key in item) {
            const value = item[key];
            if (key === "_id") {
                let title = document.createElement("p");
                title.innerHTML = value;
                title.classList.add("entity-title");
                info.appendChild(title);
                continue;
            }
            let p = document.createElement("p");
            p.classList.add("entity-property");
            p.innerHTML = `<span class="entity-key">${key}:</span>${value}`;
            divProperties.appendChild(p);
        }
        info.appendChild(divProperties);

        let buttons = document.createElement("div");
        buttons.classList.add("entity-buttons");
        let modifyButton = document.createElement("a");
        modifyButton.classList.add("entity-button");
        modifyButton.innerHTML = "Modificar";
        modifyButton.href = `http://localhost/bikes/update?_id=${item._id}`;
        let deleteButton = document.createElement("a");
        deleteButton.classList.add("entity-button");
        deleteButton.innerHTML = "Eliminar";
        deleteButton.href = `http://localhost/bikes/delete?_id=${item._id}`;
        buttons.appendChild(modifyButton);
        buttons.appendChild(deleteButton);

        let entityItem = document.createElement("div");
        entityItem.classList.add("entity-item");

        entityItem.appendChild(divImage);
        entityItem.appendChild(info);
        entityItem.appendChild(buttons);

        parent.appendChild(entityItem);
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
    const formData = new FormData(
        document.getElementsByClassName("entity-form")[0]
    );
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

export async function showForm(form, data) {
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
