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

if (form) {
    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get("_id");
    let isUpdate = _id;
    const data = isUpdate ? await getBike(_id) : BIKE_FORM_FIELDS;
    utils.showForm(form, data);
}

if (deleteElement) deleteBike();
