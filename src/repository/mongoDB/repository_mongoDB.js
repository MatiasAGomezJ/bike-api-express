module.exports = {
    list: async (model, filter) => {
        return await model.find().where(filter);
    },
    getById: async (model, modelId) => {
        return await model.findById(modelId);
    },
    create: async (model, body) => {
        try {
            return await model.create(body);
        } catch (error) {
            return null;
        }
    },
    update: async (model, modelId, body) => {
        try {
            const modelItem = new model(body);
            await modelItem.validate();
            return await model.findByIdAndUpdate(modelId, body, { new: true });
        } catch (error) {
            return null;
        }
    },
    delete: async (model, modelId) => {
        return await model.findByIdAndDelete(modelId);
    },
    deleteMany: async (model, filter) => {
        return await model.deleteMany(filter);
    },
};
