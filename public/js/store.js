import * as utils from "./utils.js";

const STORE_FORM_FIELDS = {
    name: { label: "Nombre", value: "" },
    country: { label: "País", value: "" },
    city: { label: "Ciudad", value: "" },
};

const getStores = async () => {
    return utils.getAll(utils.ENTITIES.STORE);
};

const getStore = async (id) => {
    return utils.getOne(utils.ENTITIES.STORE, id);
};

const deleteStore = async (id) => {
    await utils.deleteOne(utils.ENTITIES.STORE, id);
};

const init = async () => {
    const entitiesContainer = document.querySelector(".entities-container");
    if (entitiesContainer) {
        const data = utils.mapToAllFormFields(
            await getStores(),
            STORE_FORM_FIELDS
        );
        utils.show(entitiesContainer, utils.ENTITIES.STORE, data);
    }

    const form = document.querySelector(".entity-form-container");
    if (form) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("_id");
        const data = id
            ? utils.mapToFormFields(await getStore(id), STORE_FORM_FIELDS)
            : STORE_FORM_FIELDS;
        utils.showForm(form, utils.ENTITIES.STORE, data);
    }

    const deleteElement = document.querySelector(".entity-delete");
    if (deleteElement) {
        const id = new URLSearchParams(window.location.search).get("_id");
        await deleteStore(id);
    }
};

init();
