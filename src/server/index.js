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
app.use(express.json());
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
  socket.on('lobbyUpdateToServer', function(data) {
    io.emit('lobbyUpdateToClient', data)
  })
});

const game = require('./controllers/GameController.js');

// Creates a lobby in MongoDB.
app.post("/api/createLobby", game.create)

// Updates a lobby in MongoDB.
app.post("/api/updateLobby", game.update)

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

server.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/