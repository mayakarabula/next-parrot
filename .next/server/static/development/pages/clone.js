module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/clone.js":
/*!************************!*\
  !*** ./pages/clone.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ "next/link");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! isomorphic-unfetch */ "isomorphic-unfetch");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/constants */ "./shared/constants.js");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_shared_constants__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../redux/actions */ "./redux/actions.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_6__);



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var ChatTwo =
/*#__PURE__*/
function (_Component) {
  _inherits(ChatTwo, _Component);

  function ChatTwo() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ChatTwo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ChatTwo)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      field: '',
      newMessage: 0,
      messages: _this.props.messages,
      subscribe: false,
      subscribed: false
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "subscribe", function () {
      if (_this.state.subscribe && !_this.state.subscribed) {
        // connect to WS server and listen event
        var dispatch = _this.props.dispatch;
        console.log('should subscribe');

        _this.props.socket.on(_shared_constants__WEBPACK_IMPORTED_MODULE_4___default.a.PROJECTS_LIST, function (data) {
          return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["assignProjects"])(data));
        });

        _this.props.socket.on(_shared_constants__WEBPACK_IMPORTED_MODULE_4___default.a.GENERAL_ERROR, function (data) {
          return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["assignErrors"])(data));
        });

        _this.props.socket.on(_shared_constants__WEBPACK_IMPORTED_MODULE_4___default.a.STDOUT, function (data) {
          return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["assignSTDOUT"])(data));
        });

        _this.props.socket.on(_shared_constants__WEBPACK_IMPORTED_MODULE_4___default.a.STDERR, function (data) {
          return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["assignSTDERR"])(data));
        });

        _this.props.socket.on(_shared_constants__WEBPACK_IMPORTED_MODULE_4___default.a.PROCESS_FINISHED, function (data) {
          return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["assignSTDOUT"])(data));
        });

        _this.props.socket.on(_shared_constants__WEBPACK_IMPORTED_MODULE_4___default.a.START_PROCESS, function (data) {
          return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["assignSTDOUT"])(data));
        });

        _this.props.socket.on(_shared_constants__WEBPACK_IMPORTED_MODULE_4___default.a.PROCESSES_LIST, function (data) {
          return dispatch(Object(_redux_actions__WEBPACK_IMPORTED_MODULE_5__["assignProcesses"])(data));
        }); // this.props.socket.on('message.chat2', this.handleMessage)
        // this.props.socket.on('message.chat1', this.handleOtherMessage)


        _this.setState({
          subscribed: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "consoleOut", function (d) {
      console.log(d);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMessage", function (message) {
      _this.setState(function (state) {
        return {
          messages: state.messages.concat(message)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOtherMessage", function () {
      _this.setState(function (prevState) {
        return {
          newMessage: prevState.newMessage + 1
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (event) {
      _this.setState({
        field: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (event) {
      event.preventDefault(); // create message object

      var message = {
        type: 'defined',
        task_id: 'easy mode',
        project_id: 'example',
        command: "ruby",
        cwd: "/Users/jakub/next-parrot",
        args: ["hello.rb"] // send object to WS server

      };

      _this.props.socket.emit(_shared_constants__WEBPACK_IMPORTED_MODULE_4___default.a.START_PROCESS, message); // add it to state and clean current input value


      _this.setState(function (state) {
        return {
          field: '',
          messages: state.messages.concat(message)
        };
      });
    });

    return _this;
  }

  _createClass(ChatTwo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.subscribe();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.subscribe();
    }
  }, {
    key: "componentWillUnmount",
    // close socket connection
    value: function componentWillUnmount() {
      this.props.socket.off('message.chat1', this.handleOtherMessage);
      this.props.socket.off('message.chat2', this.handleMessage);
    } // add messages from server to the state

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
        href: '/'
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, "Chat One ".concat(this.state.newMessage > 0 ? "( ".concat(this.state.newMessage, " new message )") : ''))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {
        href: '/clone'
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", null, 'Chat Two')), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, this.state.messages.map(function (message) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", {
          key: message.id
        }, message.value);
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
        onSubmit: function onSubmit(e) {
          return _this2.handleSubmit(e);
        }
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        onChange: this.handleChange,
        type: "text",
        placeholder: "Hello world!",
        value: this.state.field
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", null, "Send"))));
    }
  }], [{
    key: "getInitialProps",
    // fetch old messages data from the server
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
        var req, response, messages;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                req = _ref.req;
                _context.next = 3;
                return isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_3___default()('http://localhost:3000/messages/chat2');

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                messages = _context.sent;
                return _context.abrupt("return", {
                  messages: messages
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.socket && !state.subscribe) return {
        subscribe: true
      };
      return null;
    }
  }]);

  return ChatTwo;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

_defineProperty(ChatTwo, "defaultProps", {
  messages: [] // init state with the prefetched messages

});

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])()(ChatTwo));

/***/ }),

/***/ "./redux/actionTypes.js":
/*!******************************!*\
  !*** ./redux/actionTypes.js ***!
  \******************************/
/*! exports provided: actionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionTypes", function() { return actionTypes; });
var actionTypes = {
  ASSIGN_PROCESSES: 'ASSIGN_PROCESSES',
  ASSIGN_PROJECTS: 'ASSIGN_PROJECTS',
  ASSIGN_STDOUT: 'ASSIGN_STDOUT',
  ASSIGN_STDERR: 'ASSIGN_STDERR',
  ASSIGN_ERRORS: 'ASSIGN_ERRORS'
};

/***/ }),

/***/ "./redux/actions.js":
/*!**************************!*\
  !*** ./redux/actions.js ***!
  \**************************/
/*! exports provided: assignProjects, assignProcesses, assignSTDOUT, assignSTDERR, assignErrors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignProjects", function() { return assignProjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignProcesses", function() { return assignProcesses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignSTDOUT", function() { return assignSTDOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignSTDERR", function() { return assignSTDERR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignErrors", function() { return assignErrors; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./redux/actionTypes.js");
 // ACTIONS

var assignProjects = function assignProjects(projects) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["actionTypes"].ASSIGN_PROJECTS,
    payload: projects
  };
};
var assignProcesses = function assignProcesses(processes) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["actionTypes"].ASSIGN_PROCESSES,
    payload: processes
  };
};
var assignSTDOUT = function assignSTDOUT(stdout) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["actionTypes"].ASSIGN_STDOUT,
    payload: stdout
  };
};
var assignSTDERR = function assignSTDERR(stderr) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["actionTypes"].ASSIGN_STDERR,
    payload: stderr
  };
};
var assignErrors = function assignErrors(errors) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["actionTypes"].ASSIGN_ERRORS,
    payload: errors
  };
};

/***/ }),

/***/ "./shared/constants.js":
/*!*****************************!*\
  !*** ./shared/constants.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  PROCESSES_CHANNEL: 'PROCESSES_CHANNEL',
  GENERAL_CHANNEL: 'GENERAL_CHANNEL',
  GENERAL_ERROR: 'GENERAL_ERROR',
  GET_PROJECTS: 'GET_PROJECTS',
  PROJECTS_LIST: 'PROJECTS_LIST',
  START_PROCESS: 'START_PROCESS',
  PROCESSES_LIST: 'PROCESSES_LIST',
  PROCESS_STARTED: 'PROCESS_STARTED',
  PROCESS_FINISHED: 'PROCESS_FINISHED',
  STDOUT: 'STDOUT',
  STDERR: 'STDERR'
};

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/clone.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/clone.js */"./pages/clone.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "next/link":
/*!****************************!*\
  !*** external "next/link" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/link");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ })

/******/ });
//# sourceMappingURL=clone.js.map