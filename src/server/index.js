import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'

const app = express()
const http = require("http");
const socketIo = require("socket.io");
const db = require('../../auth.json')['mongoURI'];

// Set up database to MLab
var mongoose = require('mongoose');
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(cors())
app.use(express.static("public"))
app.use(express.json());

// Define socket.io connection
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", socket => {
  socket.on("disconnect", () => console.log("Client disconnected"));
  socket.on('connected', function(data) {
    console.log('New connection from lobby', data)
    socket.emit('newUser', data)
  });

  // Handle when a user joins/updates the lobby.
  socket.on('lobbyJoinServer', function(data) {
    // Tell all socket connections someone has joined.
    io.emit('lobbyJoinClient', data)
  })

  // Handle when a user leaves/updates the lobby.
  socket.on('lobbyLeaveServer', function(data) {
    // Tell all socket connections (except sender) someone has left.
    socket.broadcast.emit('lobbyLeaveClient', data)
  })

  // Handle when a user starts the game.
  socket.on('startGameServer', () => {
    // Tell all socket connections someone has started the game.
    io.emit('startGameClient')
  })

  // Handle when a user has gotten finished a tongue twister/updated their score.
  socket.on('scoreUpdatedToServer', function(data) {
    // Tell all socket connections someone has updated their score.
    io.emit('scoreUpdatedToClient', data)
  })
});

const game = require('./controllers/GameController.js');

// Creates a lobby in MongoDB.
app.post("/api/createLobby", game.create)

// Joins a lobby in MongoDB.
app.post("/api/joinLobby", game.join)

// Leaves a lobby in MongoDB.
app.post("/api/leaveLobby", game.leave)

// Leaves a lobby in MongoDB.
app.post("/api/updateScoreboard", game.updateScoreboard);

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tongue Twister Racer</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch(next)
})

var server_port = process.env.PORT || 3000
server.listen(server_port, () => {
  console.log('Server has started listening on port: ' + server_port);
})