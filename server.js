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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

var _Home = __webpack_require__(11);

var _Home2 = _interopRequireDefault(_Home);

var _Join = __webpack_require__(12);

var _Join2 = _interopRequireDefault(_Join);

var _Create = __webpack_require__(13);

var _Create2 = _interopRequireDefault(_Create);

var _Lobby = __webpack_require__(14);

var _Lobby2 = _interopRequireDefault(_Lobby);

var _Game = __webpack_require__(16);

var _Game2 = _interopRequireDefault(_Game);

var _Grid = __webpack_require__(18);

var _Grid2 = _interopRequireDefault(_Grid);

var _api = __webpack_require__(19);

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
}, {
  path: '/popular/:id',
  component: _Grid2.default,
  fetchInitialData: function fetchInitialData() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return (0, _api.fetchPopularRepos)(path.split('/').pop());
  }
}];

exports.default = routes;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(6);

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(7);

var _cors2 = _interopRequireDefault(_cors);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(8);

var _reactRouterDom = __webpack_require__(1);

var _serializeJavascript = __webpack_require__(9);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _App = __webpack_require__(10);

var _App2 = _interopRequireDefault(_App);

var _routes = __webpack_require__(3);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var http = __webpack_require__(22);
var socketIo = __webpack_require__(23);
var db = __webpack_require__(24)['mongoURI'];

// Set up database to MLab
var mongoose = __webpack_require__(4);
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
  socket.on('lobbyUpdateToServer', function (data) {
    io.emit('lobbyUpdateToClient', data);
  });

  socket.on('startGame', function () {
    io.emit('startGameToClient');
  });
});

var game = __webpack_require__(25);

// Creates a lobby in MongoDB.
app.post("/api/createLobby", game.create);

// Updates a lobby in MongoDB.
app.post("/api/updateLobby", game.update);

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

server.listen(3000, function () {
  console.log("Server is listening on port: 3000");
});

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routes = __webpack_require__(3);

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterDom = __webpack_require__(1);

var _NoMatch = __webpack_require__(21);

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
/* 11 */
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
/* 12 */
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
      userName: NaN,
      isCreator: false // joining a game means someone else has already created a lobby.
    };

    _this.handleUserName = _this.handleUserName.bind(_this);
    _this.handleLobbyId = _this.handleLobbyId.bind(_this);
    return _this;
  }

  _createClass(Join, [{
    key: 'handleUserName',
    value: function handleUserName(event) {
      this.setState({ userName: event.target.value });
    }
  }, {
    key: 'handleLobbyId',
    value: function handleLobbyId(event) {
      this.setState({ lobbyId: event.target.value });
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
        _react2.default.createElement('input', { type: 'text', onChange: this.handleUserName }),
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
/* 13 */
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
      userName: NaN,
      isCreator: true
    };

    _this.handleUserName = _this.handleUserName.bind(_this);
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
    key: 'handleUserName',
    value: function handleUserName(event) {
      this.setState({ userName: event.target.value });
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
        _react2.default.createElement('input', { type: 'text', name: 'userName', onChange: this.handleUserName }),
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

var _socket = __webpack_require__(15);

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
      userNames: [],
      isCreator: false
    };
    return _this;
  }

  _createClass(Lobby, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var passedState = this.props.location.state;

      // Update the local lobby with this user.
      this.setState({
        userNames: this.state.userNames.concat(passedState.userName),
        isCreator: passedState.isCreator
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
          fetch(SERVER_ENDPOINT + '/api/updateLobby', {
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
              socket.emit('lobbyUpdateToServer', data);
            });
          });
        }
      });

      // Update the lobby
      socket.on('lobbyUpdateToClient', function (data) {
        _this2.setState({
          userNames: data.userNames
        });
      });

      // Redirect to the game if someone started. 
      socket.on('startGameToClient', function () {
        _this2.props.history.push({
          pathname: '/game/' + _this2.state.lobbyId,
          state: _this2.state
        });
      });
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      socket.emit('startGame', {});
    }
  }, {
    key: 'leaveGame',
    value: function leaveGame() {
      socket.emit('leaveGame', {});
    }
  }, {
    key: 'render',
    value: function render() {
      var userList = this.state.userNames.map(function (userName) {
        return _react2.default.createElement(
          'li',
          { key: userName },
          userName
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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 16 */
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

var _reactSpeechRecognition = __webpack_require__(17);

var _reactSpeechRecognition2 = _interopRequireDefault(_reactSpeechRecognition);

var _styledComponents = __webpack_require__(2);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

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

var Game = function (_React$Component) {
    _inherits(Game, _React$Component);

    function Game(props) {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this.state = {
            lobbyId: _this.props.match.params.id,
            userNames: [],
            userScores: [0, 0], // in order for a game to start, it can only have two players.
            isCreator: false
        };
        return _this;
    }

    _createClass(Game, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var passedState = this.props.location.state;

            // Update the local lobby with this user.
            this.setState({
                userNames: passedState.userNames
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                transcript = _props.transcript,
                resetTranscript = _props.resetTranscript,
                browserSupportsSpeechRecognition = _props.browserSupportsSpeechRecognition,
                startListening = _props.startListening,
                stopListening = _props.stopListening;


            if (!browserSupportsSpeechRecognition) {
                return null;
            }
            var userList = this.state.userNames.map(function (userName) {
                return _react2.default.createElement(
                    'li',
                    { key: userName },
                    userName,
                    ': 0'
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
                    'First to 50 points wins!'
                ),
                userList,
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'h3',
                    null,
                    'Prompt'
                ),
                'She sells seashells by the seashore.',
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
                    { onClick: stopListening },
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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("react-speech-recognition");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_Component) {
  _inherits(Grid, _Component);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

    var repos = void 0;
    if (false) {
      repos = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      repos = _this.props.staticContext.data;
    }

    _this.state = {
      repos: repos,
      loading: repos ? false : true
    };

    _this.fetchRepos = _this.fetchRepos.bind(_this);
    return _this;
  }

  _createClass(Grid, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.state.repos) {
        this.fetchRepos(this.props.match.params.id);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.match.params.id !== this.props.match.params.id) {
        this.fetchRepos(this.props.match.params.id);
      }
    }
  }, {
    key: 'fetchRepos',
    value: function fetchRepos(lang) {
      var _this2 = this;

      this.setState(function () {
        return {
          loading: true
        };
      });

      this.props.fetchInitialData(lang).then(function (repos) {
        return _this2.setState(function () {
          return {
            repos: repos,
            loading: false
          };
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          loading = _state.loading,
          repos = _state.repos;


      if (loading === true) {
        return _react2.default.createElement(
          'p',
          null,
          'LOADING'
        );
      }

      return _react2.default.createElement(
        'ul',
        { style: { display: 'flex', flexWrap: 'wrap' } },
        repos.map(function (_ref) {
          var name = _ref.name,
              owner = _ref.owner,
              stargazers_count = _ref.stargazers_count,
              html_url = _ref.html_url;
          return _react2.default.createElement(
            'li',
            { key: name, style: { margin: 30 } },
            _react2.default.createElement(
              'ul',
              null,
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: html_url },
                  name
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                '@',
                owner.login
              ),
              _react2.default.createElement(
                'li',
                null,
                stargazers_count,
                ' stars'
              )
            )
          );
        })
      );
    }
  }]);

  return Grid;
}(_react.Component);

exports.default = Grid;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPopularRepos = fetchPopularRepos;

var _isomorphicFetch = __webpack_require__(20);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchPopularRepos() {
  var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

  var encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

  return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
    return data.json();
  }).then(function (repos) {
    return repos.items;
  }).catch(function (error) {
    console.warn(error);
    return null;
  });
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 21 */
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
/* 22 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {"mongoURI":"mongodb://root:root123@ds231133.mlab.com:31133/tonguetwisterracer"}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(26);

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
        userNames: req.body.state.userNames
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

// Update a game lobby identified by the lobbyId in the request
exports.update = function (req, res) {
    // First find by lobbyId.
    Game.findOne({ lobbyId: req.body.state.lobbyId }, function (err, doc) {
        // Get the actual documentId to update with the userNames from the document attributes.
        Game.findByIdAndUpdate(doc['_id'], { $set: { userNames: doc['userNames'].concat(req.body.state.userNames) } }, { new: true }, function (err, result) {
            res.json({
                'lobbyId': result['lobbyId'],
                'userNames': result['userNames']
            });
        });
    });
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(4);

// Basic Game Schema, might change later.
var GameSchema = mongoose.Schema({
    lobbyId: { type: String, required: true },
    userNames: { type: Array, "default": [] },
    userScores: { type: Array, "default": [] }
});

module.exports = mongoose.model('Game', GameSchema);

/***/ })
/******/ ]);