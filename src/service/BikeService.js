const DB = require("../repository/repository");

module.exports = {
    listBikes: async (filter) => {
        return await DB.getBikes(filter);
    }
}