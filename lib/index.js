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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// TODO:
// current way of communicating is done thru global window object
// continue researching webpack chunk loading and backbone ability to work with it
var Puppeteer = function Puppeteer(config) {
  var global = window;
  var topics = {};
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

  if (!SystemJS) error('SystemJS is required');
  if (!config.apps || _typeof(config.apps) !== "object") error('Missing "apps" object definition');
  Object.keys(config.apps).forEach(function (app) {
    var _app = config.apps[app];
    if (!_app.bundleLocation) error('Missing "bundleLocation" for app', app);
    if (!_app.domHook) error('Missing "domHook" (element id) for app', app);
    if (!_app.mountFuncName) error('Missing "mountFuncName" (global mount function) for app', app);
  });
  return {
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
    publish: function publish(topic) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      log('--- TOPIC LAUNCHED ---', topic, payload);
      var promises = topics[topic] && topics[topic].length ? topics[topic].map(function (t) {
        return t(payload);
      }) : [];
      return Promise.all(promises);
    },
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
    generateAppEvents: function generateAppEvents() {
      var self = this;
      var apps = config.apps;
      Object.keys(apps).forEach(function (app) {
        self.subscribe("".concat(app.toUpperCase(), ":MOUNT"), function () {
          if (apps[app].mounted) return true;
          return SystemJS.import(apps[app].bundleLocation).then(function (module) {
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
    getActiveApp: function getActiveApp() {
      return activeApp;
    }
  };
};

var _default = Puppeteer;
exports.default = _default;

/***/ })
/******/ ]);
});