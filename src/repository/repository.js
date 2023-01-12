const DB = require(`./${process.env.DB}/repository_${process.env.DB}`);

module.exports = DB;