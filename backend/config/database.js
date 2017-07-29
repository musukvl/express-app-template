const mongoose = require("mongoose");
const config = require("./config");

async function init() {
    mongoose.Promise = global.Promise;
    await mongoose.connect(config("mongo-connection-string"), { useMongoClient: true });
}

module.exports = { init };