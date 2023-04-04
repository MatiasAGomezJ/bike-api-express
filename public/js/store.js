import * as utils from "./utils.js";

const STORE_FORM_FIELDS = {
    name: "",
    country: "",
    city: "",
};

const init = async () => {
    const entitiesContainer = document.querySelector(".entities-container");
    if (entitiesContainer) {
        const data = await getStores();
        utils.show(entitiesContainer, utils.ENTITIES.STORE, data);
    }

    const form = document.querySelector(".entity-form-container");
    if (form) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("_id");
        const data = id ? await getStore(id) : STORE_FORM_FIELDS;
        utils.showForm(form, utils.ENTITIES.STORE, data);
    }

    const deleteElement = document.querySelector(".entity-delete");
    if (deleteElement) {
        const id = new URLSearchParams(window.location.search).get("_id");
        await deleteStore(id);
    }
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

init();
