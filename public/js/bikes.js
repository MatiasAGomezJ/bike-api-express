import * as utils from "./utils.js";

const BIKE_FORM_FIELDS = {
    name: { label: "Nombre", value: "" },
    brakes: { label: "Frenos", value: "" },
    category: { label: "Categoría", value: "" },
    clearance: { label: "Clearance", value: "" },
    drivetrain: { label: "Transmisión", value: "" },
    fork: { label: "Horquilla", value: "" },
    frame: { label: "Cuadro", value: "" },
    front_travel: { label: "Recorrido delantero", value: "" },
    groupset: { label: "Grupo", value: "" },
    msrp: { label: "Precio", value: 0 },
    seatpost: { label: "Sillín", value: "" },
    spec_level: { label: "Nivel de especificación", value: "" },
    suspension: { label: "Suspensión", value: "" },
    weight: { label: "Peso", value: "" },
    wheel_size: { label: "Tamaño de rueda", value: "" },
    wheels: { label: "Ruedas", value: "" },
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

const init = async () => {
    const entitiesContainer = document.querySelector(".entities-container");
    if (entitiesContainer) {
        const data = utils.mapToAllFormFields(
            await getBikes(),
            BIKE_FORM_FIELDS
        );
        utils.show(entitiesContainer, utils.ENTITIES.BIKE, data);
    }

    const form = document.querySelector(".entity-form-container");
    if (form) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("_id");
        const data = id
            ? utils.mapToFormFields(await getBike(id), BIKE_FORM_FIELDS)
            : BIKE_FORM_FIELDS;
        utils.showForm(form, utils.ENTITIES.BIKE, data);
    }

    const deleteElement = document.querySelector(".entity-delete");
    if (deleteElement) {
        const id = new URLSearchParams(window.location.search).get("_id");
        await deleteBike(id);
    }
};

init();
