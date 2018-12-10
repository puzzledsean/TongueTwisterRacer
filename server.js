/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
    function Player(username, score) {
        _classCallCheck(this, Player);

        this.username = username;
        this.score = score;
        this.UID = NaN;
    }

    _createClass(Player, [{
        key: "setUID",
        value: function setUID(UID) {
            this.UID = UID;
        }
    }]);

    return Player;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Home = __webpack_require__(13);

var _Home2 = _interopRequireDefault(_Home);

var _Join = __webpack_require__(14);

var _Join2 = _interopRequireDefault(_Join);

var _Create = __webpack_require__(15);

var _Create2 = _interopRequireDefault(_Create);

var _Lobby = __webpack_require__(16);

var _Lobby2 = _interopRequireDefault(_Lobby);

var _Game = __webpack_require__(17);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  path: '/',
  exact: true,
  component: _Home2.default
}, {
  path: '/join',
  exact: true,
  component: _Join2.default
}, {
  path: '/create',
  exact: true,
  component: _Create2.default
}, {
  path: '/lobby/:id',
  component: _Lobby2.default
}, {
  path: '/game/:id',
  component: _Game2.default
}];

exports.default = routes;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(9);

var _cors2 = _interopRequireDefault(_cors);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(10);

var _reactRouterDom = __webpack_require__(1);

var _serializeJavascript = __webpack_require__(11);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _App = __webpack_require__(12);

var _App2 = _interopRequireDefault(_App);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = __webpack_require__(20);
var socketIo = __webpack_require__(21);
var db = __webpack_require__(22)['mongoURI'];

// Set up database to MLab
var mongoose = __webpack_require__(6);
mongoose.connect(db).then(function () {
  return console.log('MongoDB connected...');
}).catch(function (err) {
  return console.log(err);
});

app.use((0, _cors2.default)());
app.use(_express2.default.static("public"));
app.use(_express2.default.json());

// Define socket.io connection
var server = http.createServer(app);
var io = socketIo(server);
io.on("connection", function (socket) {
  socket.on("disconnect", function () {
    return console.log("Client disconnected");
  });
  socket.on('connected', function (data) {
    console.log('New connection from lobby', data);
    socket.emit('newUser', data);
  });

  // Handle when a user joins/updates the lobby.
  socket.on('lobbyJoinServer', function (data) {
    // Tell all socket connections someone has joined.
    io.emit('lobbyJoinClient', data);
  });

  // Handle when a user leaves/updates the lobby.
  socket.on('lobbyLeaveServer', function (data) {
    // Tell all socket connections (except sender) someone has left.
    socket.broadcast.emit('lobbyLeaveClient', data);
  });

  // Handle when a user starts the game.
  socket.on('startGameServer', function () {
    // Tell all socket connections someone has started the game.
    io.emit('startGameClient');
  });

  // Handle when a user has gotten finished a tongue twister/updated their score.
  socket.on('scoreUpdatedToServer', function (data) {
    // Tell all socket connections someone has updated their score.
    io.emit('scoreUpdatedToClient', data);
  });
});

var game = __webpack_require__(23);

// Creates a lobby in MongoDB.
app.post("/api/createLobby", game.create);

// Joins a lobby in MongoDB.
app.post("/api/joinLobby", game.join);

// Leaves a lobby in MongoDB.
app.post("/api/leaveLobby", game.leave);

// Leaves a lobby in MongoDB.
app.post("/api/updateScoreboard", game.updateScoreboard);

app.get("*", function (req, res, next) {
  var activeRoute = _routes2.default.find(function (route) {
    return (0, _reactRouterDom.matchPath)(req.url, route);
  }) || {};

  var promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise.then(function (data) {
    var context = { data: data };

    var markup = (0, _server.renderToString)(_react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(_App2.default, null)
    ));

    res.send("\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>Tongue Twister Racer</title>\n          <script src=\"/bundle.js\" defer></script>\n          <script>window.__INITIAL_DATA__ = " + (0, _serializeJavascript2.default)(data) + "</script>\n        </head>\n\n        <body>\n          <div id=\"app\">" + markup + "</div>\n        </body>\n      </html>\n    ");
  }).catch(next);
});

var server_port = process.env.PORT || 3000;
server.listen(server_port, function () {
  console.log('Server has started listening on port: ' + server_port);
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routes = __webpack_require__(4);

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterDom = __webpack_require__(1);

var _NoMatch = __webpack_require__(19);

var _NoMatch2 = _interopRequireDefault(_NoMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _routes2.default.map(function (_ref) {
            var path = _ref.path,
                exact = _ref.exact,
                Component = _ref.component,
                rest = _objectWithoutProperties(_ref, ['path', 'exact', 'component']);

            return _react2.default.createElement(_reactRouterDom.Route, { key: path, path: path, exact: exact, render: function render(props) {
                return _react2.default.createElement(Component, _extends({}, props, rest));
              } });
          }),
          _react2.default.createElement(_reactRouterDom.Route, { render: function render(props) {
              return _react2.default.createElement(_NoMatch2.default, props);
            } })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  background: palevioletred;\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  color: white;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n'], ['\n  background: palevioletred;\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  color: white;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n'], ['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n']);

exports.default = Home;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _styledComponents = __webpack_require__(2);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Button = _styledComponents2.default.button(_templateObject);

var Container = _styledComponents2.default.div(_templateObject2);

function Home() {
  return _react2.default.createElement(
    Container,
    null,
    _react2.default.createElement(
      'h1',
      null,
      'Tongue Twister Racer'
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/create' },
      _react2.default.createElement(
        Button,
        null,
        'Create a game'
      )
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/join' },
      _react2.default.createElement(
        Button,
        null,
        'Join a game'
      )
    )
  );
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  background: ', ';\n  color: ', ';\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n'], ['\n  background: ', ';\n  color: ', ';\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n'], ['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _styledComponents = __webpack_require__(2);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Player = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Button = _styledComponents2.default.button(_templateObject, function (props) {
  return props.primary ? "palevioletred" : "white";
}, function (props) {
  return props.primary ? "white" : "palevioletred";
});

var Container = _styledComponents2.default.div(_templateObject2);

var Join = function (_React$Component) {
  _inherits(Join, _React$Component);

  function Join(props) {
    _classCallCheck(this, Join);

    var _this = _possibleConstructorReturn(this, (Join.__proto__ || Object.getPrototypeOf(Join)).call(this, props));

    _this.state = {
      lobbyId: NaN,
      currentPlayer: NaN,
      isCreator: false // joining a game means someone else has already created a lobby.
    };

    _this.handleCurrentPlayer = _this.handleCurrentPlayer.bind(_this);
    _this.handleLobbyId = _this.handleLobbyId.bind(_this);
    return _this;
  }

  _createClass(Join, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'handleCurrentPlayer',
    value: function handleCurrentPlayer(event) {
      this.setState({
        currentPlayer: new _Player.Player(event.target.value, 0)
      });
    }
  }, {
    key: 'handleLobbyId',
    value: function handleLobbyId(event) {
      this.setState({
        lobbyId: event.target.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        Container,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Join a game'
        ),
        'Enter your name',
        _react2.default.createElement('br', null),
        _react2.default.createElement('input', { type: 'text', name: 'currentPlayer', onChange: this.handleCurrentPlayer }),
        _react2.default.createElement('br', null),
        'Enter Lobby to join',
        _react2.default.createElement('br', null),
        _react2.default.createElement('input', { type: 'text', onChange: this.handleLobbyId }),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' },
          _react2.default.createElement(
            Button,
            null,
            'Back'
          )
        ),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: {
              pathname: '/lobby/' + this.state.lobbyId,
              state: this.state
            } },
          _react2.default.createElement(
            Button,
            { primary: true },
            'Join'
          )
        )
      );
    }
  }]);

  return Join;
}(_react2.default.Component);

exports.default = Join;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  background: ', ';\n  color: ', ';\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n'], ['\n  background: ', ';\n  color: ', ';\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n'], ['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _styledComponents = __webpack_require__(2);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Player = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Button = _styledComponents2.default.button(_templateObject, function (props) {
  return props.primary ? "palevioletred" : "white";
}, function (props) {
  return props.primary ? "white" : "palevioletred";
});

var Container = _styledComponents2.default.div(_templateObject2);

var Create = function (_React$Component) {
  _inherits(Create, _React$Component);

  function Create(props) {
    _classCallCheck(this, Create);

    var _this = _possibleConstructorReturn(this, (Create.__proto__ || Object.getPrototypeOf(Create)).call(this, props));

    _this.state = {
      lobbyId: NaN,
      currentPlayer: NaN,
      isCreator: true
    };

    _this.handleCurrentPlayer = _this.handleCurrentPlayer.bind(_this);
    return _this;
  }

  _createClass(Create, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setState(function () {
        return {
          lobbyId: _this2.genLobbyID()
        };
      });
    }
  }, {
    key: 'handleCurrentPlayer',
    value: function handleCurrentPlayer(event) {
      this.setState({
        currentPlayer: new _Player.Player(event.target.value, 0)
      });
    }
  }, {
    key: 'genLobbyID',
    value: function genLobbyID() {
      // Credit: https://gist.github.com/gordonbrander/2230317
      return Math.random().toString(36).substr(2, 6);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        Container,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Create a game'
        ),
        'Enter your name',
        _react2.default.createElement('br', null),
        _react2.default.createElement('input', { type: 'text', name: 'currentPlayer', onChange: this.handleCurrentPlayer }),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' },
          _react2.default.createElement(
            Button,
            null,
            'Back'
          )
        ),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: {
              pathname: '/lobby/' + this.state.lobbyId,
              state: this.state
            } },
          _react2.default.createElement(
            Button,
            { primary: true },
            'Create'
          )
        )
      );
    }
  }]);

  return Create;
}(_react2.default.Component);

exports.default = Create;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  background: ', ';\n  color: ', ';\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n'], ['\n  background: ', ';\n  color: ', ';\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n'], ['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _socket = __webpack_require__(5);

var _socket2 = _interopRequireDefault(_socket);

var _reactRouterDom = __webpack_require__(1);

var _styledComponents = __webpack_require__(2);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Button = _styledComponents2.default.button(_templateObject, function (props) {
  return props.primary ? "palevioletred" : "white";
}, function (props) {
  return props.primary ? "white" : "palevioletred";
});

var Container = _styledComponents2.default.div(_templateObject2);

var SERVER_ENDPOINT = "http://127.0.0.1:3000";
// Establish a socket connection
var socket = (0, _socket2.default)(SERVER_ENDPOINT);

var Lobby = function (_React$Component) {
  _inherits(Lobby, _React$Component);

  function Lobby(props) {
    _classCallCheck(this, Lobby);

    var _this = _possibleConstructorReturn(this, (Lobby.__proto__ || Object.getPrototypeOf(Lobby)).call(this, props));

    _this.state = {
      lobbyId: _this.props.match.params.id,
      players: [],
      isCreator: false,
      sessionId: NaN
    };
    _this.leaveGame = _this.leaveGame.bind(_this);
    return _this;
  }

  _createClass(Lobby, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var passedState = this.props.location.state;
      var currentPlayer = passedState.currentPlayer;

      // Generate session for Player's UID 
      var userSessionId = this.genUserSessionID();
      currentPlayer.setUID(userSessionId);

      // Update the local lobby with this user.
      this.setState({
        players: this.state.players.concat(currentPlayer),
        isCreator: passedState.isCreator,
        sessionId: userSessionId
      }, function () {
        // Either create a new lobby in db or update the lobby in db.
        if (_this2.state.isCreator) {
          fetch(SERVER_ENDPOINT + '/api/createLobby', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'state': _this2.state
            })
          });
        } else {
          fetch(SERVER_ENDPOINT + '/api/joinLobby', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'state': _this2.state
            })
          }).then(function (response) {
            response.json().then(function (data) {
              socket.emit('lobbyJoinServer', data);
            });
          });
        }
      });

      // Update join lobby action
      socket.on('lobbyJoinClient', function (data) {
        _this2.setState({
          players: data.players
        });
      });

      // Update leave lobby action
      socket.on('lobbyLeaveClient', function (data) {
        _this2.setState({
          players: data.players
        });
      });

      // Redirect to the game if someone started. 
      socket.on('startGameClient', function () {
        _this2.props.history.push({
          pathname: '/game/' + _this2.state.lobbyId,
          state: _this2.state
        });
      });
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      socket.emit('startGameServer', {});
    }
  }, {
    key: 'leaveGame',
    value: function leaveGame() {
      fetch(SERVER_ENDPOINT + '/api/leaveLobby', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'state': this.state
        })
      }).then(function (response) {
        response.json().then(function (data) {
          socket.emit('lobbyLeaveServer', data);
        });
      });
    }

    // Generate a session ID/UID for the user.

  }, {
    key: 'genUserSessionID',
    value: function genUserSessionID() {
      // Credit: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4();
    }
  }, {
    key: 'render',
    value: function render() {
      var userList = this.state.players.map(function (player) {
        return _react2.default.createElement(
          'li',
          { key: player.username },
          player.username
        );
      });
      return _react2.default.createElement(
        Container,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Lobby'
        ),
        'Share the code with a friend',
        _react2.default.createElement('br', null),
        'Lobby code is ',
        _react2.default.createElement(
          'b',
          null,
          this.state.lobbyId
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'h2',
          null,
          'Players:'
        ),
        userList,
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' },
          _react2.default.createElement(
            Button,
            { onClick: this.leaveGame },
            'Leave Game'
          )
        ),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: {
              pathname: '/game/' + this.state.lobbyId,
              state: this.state
            } },
          _react2.default.createElement(
            Button,
            { primary: true, onClick: this.startGame },
            'Start Game'
          )
        )
      );
    }
  }]);

  return Lobby;
}(_react2.default.Component);

exports.default = Lobby;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  background: palevioletred;\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  color: white;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n'], ['\n  background: palevioletred;\n  border-radius: 3px;\n  border: 2px solid palevioletred;\n  color: white;\n  margin: 0.5em 1em;\n  padding: 0.25em 1em;\n  font-size: 16px;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n'], ['\n  text-align: center;\n  font-family: "Arial", sans-serif;\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactSpeechRecognition = __webpack_require__(18);

var _reactSpeechRecognition2 = _interopRequireDefault(_reactSpeechRecognition);

var _styledComponents = __webpack_require__(2);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _socket = __webpack_require__(5);

var _socket2 = _interopRequireDefault(_socket);

var _Player = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Button = _styledComponents2.default.button(_templateObject);

var Container = _styledComponents2.default.div(_templateObject2);

var options = {
  autoStart: false
};

var SERVER_ENDPOINT = "http://127.0.0.1:3000";
// Establish a socket connection
var socket = (0, _socket2.default)(SERVER_ENDPOINT);

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this.state = {
      lobbyId: _this.props.match.params.id,
      players: [],
      sessionId: NaN
    };
    _this.updateScore = _this.updateScore.bind(_this);
    return _this;
  }

  _createClass(Game, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var passedState = this.props.location.state;

      // Update the local lobby with this user.
      this.setState({
        players: passedState.players,
        sessionId: passedState.sessionId
      });

      // Update scores.
      socket.on('scoreUpdatedToClient', function (data) {
        _this2.setState({
          players: data.players
        });
      });
    }
  }, {
    key: 'levenshtein',
    value: function levenshtein(a, b) {
      // Credit: https://gist.github.com/andrei-m/982927
      if (a.length == 0) return b.length;
      if (b.length == 0) return a.length;

      var matrix = [];

      // increment along the first column of each row
      var i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      // increment each column in the first row
      var j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) == a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
            Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)); // deletion
          }
        }
      }

      return matrix[b.length][a.length];
    }
  }, {
    key: 'updateScore',
    value: function updateScore(userResponse, currentTT) {
      var userResponseStripped = userResponse.split(' ').join('');
      var currentTTStripped = currentTT.split(' ').join('');

      var levenshteinScore = this.levenshtein(userResponseStripped, currentTTStripped);

      // Low levenshtein score means user got a really good score (inverse relationship). 
      var score = currentTTStripped.length - levenshteinScore;
      if (score < 0) {
        score = 0;
      }

      fetch(SERVER_ENDPOINT + '/api/updateScoreboard', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'state': this.state,
          'score': score
        })
      }).then(function (response) {
        response.json().then(function (data) {
          socket.emit('scoreUpdatedToServer', data);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          transcript = _props.transcript,
          resetTranscript = _props.resetTranscript,
          browserSupportsSpeechRecognition = _props.browserSupportsSpeechRecognition,
          startListening = _props.startListening,
          abortListening = _props.abortListening;


      if (!browserSupportsSpeechRecognition) {
        return null;
      }
      var userList = this.state.players.map(function (player) {
        return _react2.default.createElement(
          'li',
          { key: player.username },
          player.username,
          ': ',
          player.score
        );
      });

      var userResponse = void 0;
      if (transcript) {
        userResponse = _react2.default.createElement(
          'div',
          null,
          transcript
        );
      } else {
        userResponse = _react2.default.createElement(
          'div',
          null,
          '...'
        );
      }

      var currentTT = 'She sells seashells by the seashore';

      return _react2.default.createElement(
        Container,
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Tongue Twister Racer'
        ),
        _react2.default.createElement(
          'h2',
          null,
          'Scoreboard'
        ),
        _react2.default.createElement(
          'h4',
          null,
          'First to 300 points wins!'
        ),
        userList,
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'h3',
          null,
          'Prompt'
        ),
        currentTT,
        _react2.default.createElement(
          'h3',
          null,
          'Your response'
        ),
        userResponse,
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          Button,
          { onClick: function onClick() {
              resetTranscript();startListening();
            } },
          'Record'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          Button,
          { onClick: function onClick() {
              resetTranscript();abortListening();_this3.updateScore(transcript, currentTT);
            } },
          'Stop Recording and Submit'
        ),
        _react2.default.createElement('br', null)
      );
    }
  }]);

  return Game;
}(_react2.default.Component);

exports.default = (0, _reactSpeechRecognition2.default)(options)(Game);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("react-speech-recognition");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoMatch;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMatch() {
  return _react2.default.createElement(
    'div',
    null,
    '404 page not found'
  );
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {"mongoURI":"mongodb://root:root123@ds231133.mlab.com:31133/tonguetwisterracer"}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(24);

// Create and Save a new Game 
exports.create = function (req, res) {
    // Validate request
    if (!req.body.state) {
        return res.status(400).send(JSON.stringify({
            message: "Body can not be empty"
        }));
    }

    // Create a Game 
    var game = new Game({
        lobbyId: req.body.state.lobbyId,
        players: req.body.state.players
    });

    // Save Game in the database
    game.save().then(function (data) {
        res.json(data);
    }).catch(function (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Game."
        });
    });
};

// Join a game lobby identified by the lobbyId in the request
exports.join = function (req, res) {
    // First find by lobbyId.
    Game.findOne({ lobbyId: req.body.state.lobbyId }, function (err, doc) {
        // Get the actual documentId to update with the players list from the document attributes.
        Game.findByIdAndUpdate(doc['_id'], { $set: { players: doc['players'].concat(req.body.state.players) } }, { new: true }, function (err, result) {
            res.json({
                'lobbyId': result['lobbyId'],
                'players': result['players']
            });
        });
    });
};

// Leaves a game lobby identified by the lobbyId in the request
exports.leave = function (req, res) {
    // First find by lobbyId.
    Game.findOne({ lobbyId: req.body.state.lobbyId }, function (err, doc) {
        // Get the actual documentId to update with the players list from the document attributes.
        Game.findByIdAndUpdate(doc['_id'], {
            $pull: { 'players': {
                    'UID': req.body.state.sessionId
                }
            }
        }, { 'new': true }, function (err, result) {
            res.json({
                'lobbyId': result['lobbyId'],
                'players': result['players']
            });
        });
    });
};

// Leaves a game lobby identified by the lobbyId in the request
exports.updateScoreboard = function (req, res) {
    // First find the proper Game by lobbyId.
    Game.findOneAndUpdate({ lobbyId: req.body.state.lobbyId, 'players.UID': req.body.state.sessionId }, { $inc: { "players.$.score": req.body.score } }, // increment the user's score 
    { 'new': true }, function (err, result) {
        if (err) {
            console.log('error', err);
        } else {
            res.json({
                'lobbyId': result['lobbyId'],
                'players': result['players']
            });
        }
    });
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(6);

// Basic Game Schema, might change later.
var GameSchema = mongoose.Schema({
    lobbyId: { type: String, required: true },
    players: { type: Object, "default": [] }
});

module.exports = mongoose.model('Game', GameSchema);

/***/ })
/******/ ]);