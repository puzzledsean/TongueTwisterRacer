const TongueTwister = require('../models/TongueTwisterModel.js');

// Create and Save a new Game 
exports.get = (req, res) => {
    TongueTwister.find({}, function(err, result) {
        res.json({
            'tonguetwisters': result,
        })
     });
};