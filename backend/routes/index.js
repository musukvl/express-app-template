var express = require('express');

const database = require("../config/database");
const Event = require('../model/Event');

async function index(req, res, next) {
    var event = new Event({client: "Client12", type: "Type12", data: "data12", date: new Date()});
    var x = await event.save();
    res.render('index', { title: 'Express' });
}


const router = express.Router();

router.get('/', index);

module.exports = router;
