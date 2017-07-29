"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    client: { type: String},
    date: { type: Date },
    type: { type: String},
    data: Schema.Types.Mixed
});

module.exports = mongoose.model('Event', eventSchema);