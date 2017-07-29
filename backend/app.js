const log = require("./config/log")("main");

const database = require("./config/database");
const express = require("./config/express");
const server = require("./config/server");

async function main() {
    log.info("Connecting to database...");
    await database.init()

    log.info("Creating express app...");
    let app = await express.init();

    log.info("Run http server...");
    await server.init(app);

    log.info("Application startup is done.");

}

main()
    .catch(err => log.error(err));
