const mongoose = require('mongoose');

// Basic Game Schema, might change later.
const GameSchema = mongoose.Schema({
    lobbyId: {type: String, required: true},
    userNames: { type : Array , "default" : [] },
    userScores: { type : Array, "default": []},
});

module.exports = mongoose.model('Game', GameSchema);