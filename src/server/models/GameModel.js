const mongoose = require('mongoose');

// Basic Game Schema, might change later.
const GameSchema = mongoose.Schema({
    lobbyId : {type: String, required: true},
    players : { type : Object, "default" : [] },
});

module.exports = mongoose.model('Game', GameSchema);