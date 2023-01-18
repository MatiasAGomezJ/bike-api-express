var mongoose = require("mongoose");

mongoose.set('strictQuery', false);

var mongoDBUri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@sandbox.glkvp.mongodb.net/bike-app-${process.env.NODE_ENV}?retryWrites=true&w=majority`;

module.exports = {
    connect: () => {
        mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });
    },
    disconnect: () => {
        mongoose.disconnect();
    }
}
