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

const init = async () => {
    const entitiesContainer = document.querySelector(".entities-container");
    if (entitiesContainer) {
        const bikes = await getBikes();
        utils.show(entitiesContainer, utils.ENTITIES.BIKE, bikes);
    }

    const form = document.querySelector(".entity-form-container");
    if (form) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("_id");
        const data = id ? await getBike(id) : BIKE_FORM_FIELDS;
        utils.showForm(form, utils.ENTITIES.BIKE, data);
    }

    const deleteElement = document.querySelector(".entity-delete");
    if (deleteElement) {
        const id = new URLSearchParams(window.location.search).get("_id");
        await deleteBike(id);
    }
};

const getBikes = async () => {
    return utils.getAll(utils.ENTITIES.BIKE);
};

const getBike = async (id) => {
    return utils.getOne(utils.ENTITIES.BIKE, id);
};

const deleteBike = async (id) => {
    await utils.deleteOne(utils.ENTITIES.BIKE, id);
};

init();
