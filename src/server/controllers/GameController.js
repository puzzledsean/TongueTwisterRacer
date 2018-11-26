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
        lobbyId : req.body.state.lobbyId,
        players : req.body.state.players,
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

// Join a game lobby identified by the lobbyId in the request
exports.join = (req, res) => {
    // First find by lobbyId.
    Game.findOne(
        {lobbyId: req.body.state.lobbyId}, 
        function (err, doc) {
            // Get the actual documentId to update with the players list from the document attributes.
            Game.findByIdAndUpdate(
                doc['_id'],
                {$set: {players : doc['players'].concat(req.body.state.players)}},
                {new:true},
                function(err,result) {
                    res.json({
                        'lobbyId': result['lobbyId'],
                        'players': result['players']
                    })
                }
            )
        }
    )
};

// Leaves a game lobby identified by the lobbyId in the request
exports.leave = (req, res) => {
    // First find by lobbyId.
    Game.findOne(
        {lobbyId: req.body.state.lobbyId}, 
        function (err, doc) {
            // Get the actual documentId to update with the players list from the document attributes.
            Game.findByIdAndUpdate(
                doc['_id'],
                {
                    $pull: { 'players' : {
                        'UID': req.body.socketId
                        }
                    }
                },
                {'new': true},
                function(err,result) {
                    res.json({
                        'lobbyId': result['lobbyId'],
                        'players': result['players']
                    })
                }
            )
        }
    )
};