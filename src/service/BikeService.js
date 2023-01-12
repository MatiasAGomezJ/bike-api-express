const DB = require("../repository/repository");

async function listBikes(filter) {
    return await DB.findAll(filter);
}

module.exports = {
    listBikes,
}