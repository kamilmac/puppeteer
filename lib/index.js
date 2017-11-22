(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["puppeteer"] = factory();
	else
		root["puppeteer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaultLoader = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Consumes Config object and creates Puppeteer instance
 *
 * {
 *   loader: OPTIONAL_LOADER_FUNCTION
 *   dev: DEV_FLAG
 *   apps: {
 *     // Uppercase object key is used as a base for action type and hash name
 *     app1: {
 *       bundleLocation: ['app1.js'],
 *       // document element id where app will be attached
 *       domHook: 'app1',
 *       // Mounting function accesible of window object
 *       // should return unmount function
 *       mountFuncName: 'mountApp1'
 *     },
 *     app2: {
 *       bundleLocation: ['app2.js'],
 *       domHook: 'app2',
 *       mountFuncName: 'mountApp2'
 *     },
 *   },
 * }
 * @param {Object} config
 * @returns {Object} Puppeteer instance
 */
var Puppeteer = function Puppeteer(config) {
  var global = window;
  var topics = {};
  var loader = config.loader || _defaultLoader.default;
  var store = {};
  var activeApp = null;
  var routerInitiated = false;
  var storeAttached = false;

  var log = function log() {
    var _console;

    if (config.dev) (_console = console).log.apply(_console, arguments);
  };

  var warn = function warn() {
    var _console2;

    (_console2 = console).warn.apply(_console2, arguments);
  };

  var error = function error() {
    var _console3;

    (_console3 = console).error.apply(_console3, arguments);
  };

  global.puppeteerActive = true;
  if (typeof loader !== 'function') error('Provider app loader is not a function');
  if (!config.apps || _typeof(config.apps) !== "object") error('Missing "apps" object definition');
  Object.keys(config.apps).forEach(function (app) {
    var _app = config.apps[app];
    if (!_app.bundleLocation) error('Missing "bundleLocation" for app', app);
    if (!_app.domHook) error('Missing "domHook" (element id) for app', app);
    if (!_app.mountFuncName) error('Missing "mountFuncName" (global mount function) for app', app);
  });
  return {
    /**
     * Subscribes to TOPIC on event buss.
     * Callback is executed with payload data each time 'publish' method is run. 
     *
     * @param {String} topic Event to subscribe to.
     * @param {Function} listener Callback function run when topic event is published.
     * @returns {Function} Unsubscribe function.
     */
    subscribe: function subscribe(topic) {
      var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (storeAttached && ['STORE:GET', 'STORE:SET', 'STORE:CHANGE'].includes(topic)) {
        warn('Piggybacking on STORE.GET/SET/CHANGE prohibited');
      }

      if (!topics.hasOwnProperty(topic)) topics[topic] = [];
      var index = topics[topic].push(listener) - 1;
      return function () {
        return delete topics[topic][index];
      };
    },

    /**
     * Publishes event with optional payload.
     *
     * @param {String} topic Event to publish.
     * @param {Object} payload optional payload object.
     * @returns {Promise} Resolves when all subscribed callbacks finished.
     */
    publish: function publish(topic) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      log('--- TOPIC LAUNCHED ---', topic, payload);
      var promises = topics[topic] && topics[topic].length ? topics[topic].map(function (t) {
        return t(payload);
      }) : [];
      return Promise.all(promises);
    },

    /**
     * Wrapper for store events
     *
     * @param {String} action Event to publish. (GET|SET|CHANGE)
     * @param {String|Object|Function} arg Depending on action. (KEY_STRING|OBJECT|CALLBACK)
     * @returns {Promise|Function} Returns Promise on GET action / Unsubscribe function on CHANGE
     */
    store: function store(action, arg) {
      if (!storeAttached) {
        warn('Store is not attached', action, arg);
        return false;
      }

      var self = this;

      switch (action) {
        case 'GET':
          return self.publish('STORE:GET', arg).then(function (data) {
            return data[0];
          });
          break;

        case 'SET':
          return self.publish('STORE:SET', arg);
          break;

        case 'CHANGE':
          return self.subscribe('STORE:CHANGE', arg);
          break;

        default:
          warn('Unrecognised Store action', action, arg);
          break;
      }
    },

    /**
     * Creates default actions/events for children apps in config object.
     * It uses subscribe/publish methods.
     * Route names are based on app keys in config object
     * For each app TOPICs are created:
     *
     * ${APP}:ACTION, ${APP}:MOUNT, ${APP}:UNMOUNT
     *
     * Apps should communicate by using ${APP}:ACTION topic. MOUNT/UNMOUNT actions are resolved automatically.
     *
     * @returns {Object} returns this instance
     */
    generateAppEvents: function generateAppEvents() {
      var self = this;
      var apps = config.apps;
      Object.keys(apps).forEach(function (app) {
        self.subscribe("".concat(app.toUpperCase(), ":MOUNT"), function () {
          if (apps[app].mounted) return true;
          return loader(apps[app].bundleLocation).then(function () {
            apps[app].mounted = true;
            var mountFunc = global[apps[app].mountFuncName];

            if (!mountFunc) {
              warn("Couldn't find mount function window." + apps[app].mountFuncName);
              return false;
            }

            apps[app].unmount = mountFunc(self, apps[app].domHook);
            self.publish("".concat(app.toUpperCase(), ":MOUNT_SUCCESS"));
          });
        });
        self.subscribe("".concat(app.toUpperCase(), ":ACTION"), function (payload) {
          if (!apps[app].mounted) return self.publish("".concat(app.toUpperCase(), ":MOUNT")).then(function () {
            self.publish("".concat(app.toUpperCase(), ":ACTION"), payload);
          });
          if (activeApp === app) return false;

          if (activeApp && apps[activeApp].unmount) {
            self.publish("".concat(activeApp.toUpperCase(), ":UNMOUNT"));

            if (!apps[activeApp].unmount) {
              warn(apps[activeApp].mountFuncName + "did not return unmount function");
            }

            apps[activeApp].unmount();
            apps[activeApp].mounted = false;
          }

          activeApp = app;

          if (!payload.skipHashUpdate && routerInitiated) {
            global.location.hash = "#/".concat(app.toLowerCase());
          }
        });
      });
      return self;
    },

    /**
     * Subscribes to ROUTER:CUSTOM_HASH_CHANGE event
     * which is run each time url location changes.
     * It publishes ROUTER:NONE_EXISTING_ROUTE event when apps dont match url.
     * It also uses ${APP}:ACTION events for dynamic app mounting.
     * App route names are based on app keys in config object.
     *
     * @returns {Object} returns this instance
     */
    initiateAppRouter: function initiateAppRouter() {
      var self = this;
      var apps = config.apps;
      self.subscribe('ROUTER:CUSTOM_HASH_CHANGE', function () {
        var hash = global.location.hash;
        var hashMatched = false;
        Object.keys(apps).forEach(function (app) {
          var re = new RegExp("^#\/" + app.toLowerCase() + "($|\/)", 'g');
          if (!!hash.match(re)) hashMatched = true;

          if (!!hash.match(re) && activeApp !== app) {
            self.publish("".concat(app.toUpperCase(), ":ACTION"), {
              type: 'openApp',
              skipHashUpdate: true
            });
          }
        });
        if (hashMatched) return true;
        self.publish('ROUTER:NONE_EXISTING_ROUTE');

        if (activeApp && apps[activeApp].unmount) {
          apps[activeApp].unmount();
          apps[activeApp].mounted = false;
          activeApp = null;
        }
      });
      global.addEventListener('hashchange', function () {
        return self.publish('ROUTER:CUSTOM_HASH_CHANGE');
      });
      self.publish('ROUTER:CUSTOM_HASH_CHANGE');
      routerInitiated = true;
      return self;
    },

    /**
     * Creates simple key-value store which also uses publish/subscribe for communication.
     * Instead of calling publish/subscribe,
     * Puppeteer provides store wrapper for dealing with it.
     *
     * @param {Object} Optional initial store.
     * @returns {Object} returns this instance.
     */
    attachStore: function attachStore() {
      var _store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var self = this;
      store = _store;
      self.subscribe('STORE:SET', function (data) {
        if (_typeof(data) !== 'object') {
          warn('STORE:SET expect object s argument');
          return false;
        }

        store = _extends({}, store, data);
        self.publish('STORE:CHANGE', data);
      });
      self.subscribe('STORE:GET', function (key) {
        return store[key];
      });
      storeAttached = true;
      return self;
    },

    /**
     * Returns name of current active app.
     *
     * @returns {String}
     */
    getActiveApp: function getActiveApp() {
      return activeApp;
    }
  };
};

var _default = Puppeteer;
exports.default = _default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var Loader = function Loader(file) {
  return new Promise(function (resolve, reject) {
    var el = null;
    var js = document.querySelectorAll("[src=\"".concat(file, "\"]"));

    if (js.length) {
      return resolve(null);
    }

    var css = document.querySelectorAll("[href=\"".concat(file, "\"]"));

    if (css.length) {
      css[0].disabled = false;
      return resolve(null);
    }

    switch (true) {
      case !!file.match(/\.js$/g):
        el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = file;

        el.onload = function () {
          return resolve(null);
        };

        document.body.appendChild(el);
        break;

      case !!file.match(/\.css$/g):
        el = document.createElement('link');
        el.rel = 'stylesheet';
        el.type = 'text/css';
        el.setAttribute('custom_loaded_stylesheet', 'true');
        el.href = file;

        el.onload = function () {
          return resolve(null);
        };

        document.head.appendChild(el);
        break;

      default:
        resolve(null);
    }
  });
};

var multiLoader = function multiLoader(files) {
  var loadFiles = function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_files) {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _file;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 3;
              _iterator = _files[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 12;
                break;
              }

              _file = _step.value;
              _context.next = 9;
              return Loader(_file);

            case 9:
              _iteratorNormalCompletion = true;
              _context.next = 5;
              break;

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 18:
              _context.prev = 18;
              _context.prev = 19;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 21:
              _context.prev = 21;

              if (!_didIteratorError) {
                _context.next = 24;
                break;
              }

              throw _iteratorError;

            case 24:
              return _context.finish(21);

            case 25:
              return _context.finish(18);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    }));

    return function loadFiles(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  if (typeof files === 'string') {
    return Loader(files);
  }

  if (!Array.isArray(files)) {
    return console.error('Loader expects string or array');
  }

  var allCustomLoadedStylesheets = document.querySelectorAll("[custom_loaded_stylesheet=\"true\"]");
  allCustomLoadedStylesheets.forEach(function (el) {
    el.disabled = true;
  });
  return loadFiles(files);
};

var _default = multiLoader;
exports.default = _default;

/***/ })
/******/ ]);
});