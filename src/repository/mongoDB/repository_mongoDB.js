function mapInto(model, body) {
    const modelItem = new model();

    for (const item in body) {
        modelItem[item] = body[item];
    }

    return modelItem;
}

module.exports = {
    list: async (model, filter) => {
        return await model.find().where(filter);
    },
    getById: async (modelId) => {
        return await model.findById(modelId);
    },
    create: async (model, body) => {
        modelItem = mapInto(model, body);
        return await modelItem.save();
    },
    update: async (model, modelId, body) => {
        return await model.findByIdAndUpdate(modelId, body);
    },
    delete: async (model, modelId) => {
        return await model.findByIdAndDelete(modelId);
    },
};
