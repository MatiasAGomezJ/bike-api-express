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
} 

async function getData() {
    try {
        let response = await fetch("http://localhost/api/bike");
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function getBike(_id) {
    try {
        let response = await fetch(`http://localhost/api/bike/${_id}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
/*
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);

  fetch(form.getAttribute('action'), {
    method: form.getAttribute('method'),
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(data.entries()))
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`POST request failed with status ${response.status}`);
    }
    // Redirect to another page
    window.location.href = 'https://example.com/another-page';
  })
  .catch(error => {
    console.error(error);
  });
});
*/
form = document.getElementsByClassName("bike-form-container")[0];
async function showForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get("_id");
    isUpdate = _id;
    const data = isUpdate ? await getBike(_id) : BIKE_FORM_FIELDS;

    updateForm = document.createElement("form");
    updateForm.classList.add("bike-form");

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
            input.setAttribute("type", typeof e == "number" ? "number" : "text");
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
/*
brakes: "Hydraulic Disc"
category: "Jamaicana"
clearance: "28c"
drivetrain: "2 x 12 Electronic"
fork: "Carbon"
frame: "Carbon"
front_travel: "-"
groupset: "Ultegra Di2"
msrp: 415
seatpost: "Rigid"
spec_level: "High-End"
suspension: "Rigid"
weight: "18.2 lbs"
wheel_size: "700c"
wheels: "Carbon"
__v: 0
_id: "63c89dc257c2b831f18e68df"
*/
// const bikeTypes = {
//     brakes: "string",
//     category: "string",
//     clearance: "string",
//     drivetrain: "string",
//     fork: "string",
//     frame: "string",
//     front_travel: "string",
//     groupset: "string",
//     msrp: "number",
//     seatpost: "string",
//     spec_level: "string",
//     suspension: "string",
//     weight: "string",
//     wheel_size: "string",
//     wheels: "string",
//     __v: "number",
// };

function createBike() {
    const formData = new FormData(
        document.getElementsByClassName("bike-form")[0]
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
        document.getElementsByClassName("bike-form")[0]
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

container = document.getElementsByClassName("bike-container")[0];
async function show() {
    let data = await getData();
    data.forEach((bike) => {
        let divImage = document.createElement("div");
        divImage.classList.add("bike-image");
        let img = document.createElement("img");
        img.src = "/resources/bikes/1.png";
        divImage.appendChild(img);

        let divInfo = document.createElement("div");
        divInfo.classList.add("bike-info");
        let divProperties = document.createElement("div");
        divProperties.classList.add("bike-properties");

        for (const key in bike) {
            const value = bike[key];
            if (key === "_id") {
                let title = document.createElement("p");
                title.innerHTML = value;
                title.classList.add("bike-title");
                divInfo.appendChild(title);
                continue;
            }
            let p = document.createElement("p");
            p.classList.add("bike-property");
            p.innerHTML = `<span class="bike-key">${key}:</span>${value}`;
            divProperties.appendChild(p);
        }
        divInfo.appendChild(divProperties);

        let divButtons = document.createElement("div");
        divButtons.classList.add("bike-buttons");
        let modifyButton = document.createElement("a");
        modifyButton.classList.add("bike-button");
        modifyButton.innerHTML = "Modificar";
        modifyButton.href = `http://localhost/bikes/update?_id=${bike._id}`;
        let deleteButton = document.createElement("a");
        deleteButton.classList.add("bike-button");
        deleteButton.innerHTML = "Eliminar";
        deleteButton.href = `http://localhost/bikes/delete?_id=${bike._id}`;
        divButtons.appendChild(modifyButton);
        divButtons.appendChild(deleteButton);

        let bikeItem = document.createElement("div");
        bikeItem.classList.add("bike-item");

        bikeItem.appendChild(divImage);
        bikeItem.appendChild(divInfo);
        bikeItem.appendChild(divButtons);

        container.appendChild(bikeItem);
    });
}

deleteElement = document.getElementsByClassName("bike-delete")[0];
async function deleteBike() {
    let data = await getData();
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

if (container) show();
if (form) showForm();
if (deleteElement) deleteBike();