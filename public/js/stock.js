import * as utils from "./utils.js";

const STOCK_FORM_FIELDS = {
    storeId: { label: "Tienda", value: "" },
    bikeId: { label: "Bicicleta", value: "" },
    rentable: { label: "Alquilable", value: true },
};

const getStocks = async () => {
    return utils.getAll(utils.ENTITIES.STOCK);
};

const getStock = async (id) => {
    const stock = await utils.getOne(utils.ENTITIES.STOCK, id);
    return stock[0];
};

const deleteStock = async (id) => {
    await utils.deleteOne(utils.ENTITIES.STOCK, id);
};

const init = async () => {
    const entitiesContainer = document.querySelector(".entities-container");
    if (entitiesContainer) {
        const data = utils.mapToAllFormFields(
            await getStocks(),
            STOCK_FORM_FIELDS
        );
        utils.show(entitiesContainer, utils.ENTITIES.STOCK, data);
    }

    const form = document.querySelector(".entity-form-container");
    if (form) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("_id");
        const data = id
            ? utils.mapToFormFields(await getStock(id), STOCK_FORM_FIELDS)
            : STOCK_FORM_FIELDS;
        utils.showForm(form, utils.ENTITIES.STOCK, data);
    }

    const deleteElement = document.querySelector(".entity-delete");
    if (deleteElement) {
        const id = new URLSearchParams(window.location.search).get("_id");
        await deleteStock(id);
    }
};

window.getStock = getStock;

init();
