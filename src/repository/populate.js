const Populator = require(`./${process.env.DB}/populate_${process.env.DB}.js`);

module.exports = Populator;