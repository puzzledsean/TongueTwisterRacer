const mongoose = require('mongoose');

// Tongue Twister Schema
const TongueTwisterSchema = mongoose.Schema({
    tonguetwister : {type: String, required: true},
    repeat : { type : Number, requred: true},
});

module.exports = mongoose.model('TongueTwister', TongueTwisterSchema);