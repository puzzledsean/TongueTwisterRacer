const Game = require('../models/GameModel.js');

// Create and Save a new Game 
exports.create = (req, res) => {
    // Validate request
    if(!req.body.state) {
        return res.status(400).send(
            JSON.stringify({
            message: "Body can not be empty"
            })
        );
    }

    // Create a Game 
    const game = new Game({
        lobbyId: req.body.state.lobbyId,
        userNames: req.body.state.userNames,
    });

    // Save Game in the database
    game.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Some error occurred while creating the Game."
        });
    });
};

// Update a game lobby identified by the lobbyId in the request
exports.update = (req, res) => {
    // First find by lobbyId.
    Game.findOne(
        {lobbyId: req.body.state.lobbyId}, 
        function (err, doc) {
            // Get the actual documentId to update with the userNames from the document attributes.
            Game.findByIdAndUpdate(
                doc['_id'],
                {$set: {userNames: doc['userNames'].concat(req.body.state.userNames)}},
                {new:true},
                function(err,result) {
                    res.json({
                        'lobbyId': result['lobbyId'],
                        'userNames': result['userNames']
                    })
                }
            )
        }
    )
};