import * as utils from "./utils.js";

const STOCK_FORM_FIELDS = {
    storeId: "",
    bikeId: "",
    rentable: "",
};

const init = async () => {
    const entitiesContainer = document.querySelector(".entities-container");
    if (entitiesContainer) {
        const data = await getStocks();
        utils.show(entitiesContainer, utils.ENTITIES.STOCK, data);
    }

    const form = document.querySelector(".entity-form-container");
    if (form) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("_id");
        const data = id ? await getStock(id) : STOCK_FORM_FIELDS;
        utils.showForm(form, utils.ENTITIES.STOCK, data);
    }

    const deleteElement = document.querySelector(".entity-delete");
    if (deleteElement) {
        const id = new URLSearchParams(window.location.search).get("_id");
        await deleteStock(id);
    }
};

const getStocks = async () => {
    return utils.getAll(utils.ENTITIES.STOCK);
};

const getStock = async (id) => {
    return utils.getOne(utils.ENTITIES.STOCK, id);
};

const deleteStock = async (id) => {
    await utils.deleteOne(utils.ENTITIES.STOCK, id);
};

init();
