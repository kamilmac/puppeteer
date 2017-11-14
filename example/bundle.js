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


var _index = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  dev: true,
  apps: {
    app1: {
      bundleLocation: './app1.js',
      domHook: 'hookForApp1',
      mountFuncName: 'mountApp1'
    },
    app2: {
      bundleLocation: './app2.js',
      domHook: 'hookForApp2',
      mountFuncName: 'mountApp2'
    }
  } // let store = {
  //   hello: 'Robert',
  // }

};
var p = (0, _index.default)(config).generateAppEvents(); // .initiateAppRouter()
// .attachStore(store)

p.publish('APP1:ACTION');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.puppeteer = t() : e.puppeteer = t();
}(this, function () {
  return function (e) {
    function t(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }

    var r = {};
    return t.m = e, t.c = r, t.d = function (e, r, n) {
      t.o(e, r) || Object.defineProperty(e, r, {
        configurable: !1,
        enumerable: !0,
        get: n
      });
    }, t.n = function (e) {
      var r = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return t.d(r, "a", r), r;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 0);
  }([function (e, t, r) {
    "use strict";

    function n() {
      return n = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];

          for (var n in r) {
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
        }

        return e;
      }, n.apply(this, arguments);
    }

    function o(e) {
      return (o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0;

    var i = function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }(r(1)),
        s = function s(e) {
      var t = window,
          r = {},
          s = {},
          a = null,
          u = !1,
          c = !1,
          l = function l() {
        var t;
        e.dev && (t = console).log.apply(t, arguments);
      },
          f = function f() {
        var e;
        (e = console).warn.apply(e, arguments);
      },
          p = function p() {
        var e;
        (e = console).error.apply(e, arguments);
      };

      return e.apps && "object" === o(e.apps) || p('Missing "apps" object definition'), Object.keys(e.apps).forEach(function (t) {
        var r = e.apps[t];
        r.bundleLocation || p('Missing "bundleLocation" for app', t), r.domHook || p('Missing "domHook" (element id) for app', t), r.mountFuncName || p('Missing "mountFuncName" (global mount function) for app', t);
      }), {
        subscribe: function subscribe(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {};
          c && ["STORE:GET", "STORE:SET", "STORE:CHANGE"].includes(e) && f("Piggybacking on STORE.GET/SET/CHANGE prohibited"), r.hasOwnProperty(e) || (r[e] = []);
          var n = r[e].push(t) - 1;
          return function () {
            return delete r[e][n];
          };
        },
        publish: function publish(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          l("--- TOPIC LAUNCHED ---", e, t);
          var n = r[e] && r[e].length ? r[e].map(function (e) {
            return e(t);
          }) : [];
          return Promise.all(n);
        },
        store: function store(e, t) {
          if (!c) return f("Store is not attached", e, t), !1;
          var r = this;

          switch (e) {
            case "GET":
              return r.publish("STORE:GET", t).then(function (e) {
                return e[0];
              });

            case "SET":
              return r.publish("STORE:SET", t);

            case "CHANGE":
              return r.subscribe("STORE:CHANGE", t);

            default:
              f("Unrecognised Store action", e, t);
          }
        },
        generateAppEvents: function generateAppEvents() {
          var r = this,
              n = e.apps;
          return Object.keys(n).forEach(function (e) {
            r.subscribe("".concat(e.toUpperCase(), ":MOUNT"), function () {
              return !!n[e].mounted || i.default.import(n[e].bundleLocation).then(function (o) {
                n[e].mounted = !0;
                var i = t[n[e].mountFuncName];
                if (!i) return f("Couldn't find mount function window." + n[e].mountFuncName), !1;
                n[e].unmount = i(r, n[e].domHook), r.publish("".concat(e.toUpperCase(), ":MOUNT_SUCCESS"));
              });
            }), r.subscribe("".concat(e.toUpperCase(), ":ACTION"), function (o) {
              return n[e].mounted ? a !== e && (a && n[a].unmount && (r.publish("".concat(a.toUpperCase(), ":UNMOUNT")), n[a].unmount || f(n[a].mountFuncName + "did not return unmount function"), n[a].unmount(), n[a].mounted = !1), a = e, void (!o.skipHashUpdate && u && (t.location.hash = "#/".concat(e.toLowerCase())))) : r.publish("".concat(e.toUpperCase(), ":MOUNT")).then(function () {
                r.publish("".concat(e.toUpperCase(), ":ACTION"), o);
              });
            });
          }), r;
        },
        initiateAppRouter: function initiateAppRouter() {
          var r = this,
              n = e.apps;
          return r.subscribe("ROUTER:CUSTOM_HASH_CHANGE", function () {
            var e = t.location.hash,
                o = !1;
            if (Object.keys(n).forEach(function (t) {
              var n = new RegExp("^#/" + t.toLowerCase() + "($|/)", "g");
              e.match(n) && (o = !0), e.match(n) && a !== t && r.publish("".concat(t.toUpperCase(), ":ACTION"), {
                type: "openApp",
                skipHashUpdate: !0
              });
            }), o) return !0;
            r.publish("ROUTER:NONE_EXISTING_ROUTE"), a && n[a].unmount && (n[a].unmount(), n[a].mounted = !1, a = null);
          }), t.addEventListener("hashchange", function () {
            return r.publish("ROUTER:CUSTOM_HASH_CHANGE");
          }), r.publish("ROUTER:CUSTOM_HASH_CHANGE"), u = !0, r;
        },
        attachStore: function attachStore() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = this;
          return s = e, t.subscribe("STORE:SET", function (e) {
            if ("object" !== o(e)) return f("STORE:SET expect object s argument"), !1;
            s = n({}, s, e), t.publish("STORE:CHANGE", e);
          }), t.subscribe("STORE:GET", function (e) {
            return s[e];
          }), c = !0, t;
        },
        getActiveApp: function getActiveApp() {
          return a;
        }
      };
    },
        a = s;

    t.default = a;
  }, function (e, t, r) {
    (function (t, r) {
      !function () {
        "use strict";

        function n(e) {
          return $ ? Symbol() : "@@" + e;
        }

        function o(e, t) {
          z || (t = t.replace(J ? /file:\/\/\//g : /file:\/\//g, ""));
          var r,
              n = (e.message || e) + "\n  " + t;
          r = V && e.fileName ? new Error(n, e.fileName, e.lineNumber) : new Error(n);
          var o = e.originalErr ? e.originalErr.stack : e.stack;
          return r.stack = B ? n + "\n  " + o : o, r.originalErr = e.originalErr || e, r;
        }

        function i(e, t) {
          throw new RangeError('Unable to resolve "' + e + '" to ' + t);
        }

        function s(e, t) {
          e = e.trim();
          var r = t && t.substr(0, t.indexOf(":") + 1),
              n = e[0],
              o = e[1];
          if ("/" === n && "/" === o) return r || i(e, t), r + e;

          if ("." === n && ("/" === o || "." === o && ("/" === e[2] || 2 === e.length && (e += "/")) || 1 === e.length && (e += "/")) || "/" === n) {
            var s,
                a = !r || "/" !== t[r.length];

            if (a ? (void 0 === t && i(e, t), s = t) : s = "/" === t[r.length + 1] ? "file:" !== r ? (s = t.substr(r.length + 2)).substr(s.indexOf("/") + 1) : t.substr(8) : t.substr(r.length + 1), "/" === n) {
              if (!a) return t.substr(0, t.length - s.length - 1) + e;
              i(e, t);
            }

            for (var u = s.substr(0, s.lastIndexOf("/") + 1) + e, c = [], l = -1, f = 0; f < u.length; f++) {
              if (-1 === l) {
                if ("." !== u[f]) l = f;else {
                  if ("." !== u[f + 1] || "/" !== u[f + 2] && f + 2 !== u.length) {
                    if ("/" !== u[f + 1] && f + 1 !== u.length) {
                      l = f;
                      continue;
                    }

                    f += 1;
                  } else c.pop(), f += 2;

                  a && 0 === c.length && i(e, t);
                }
              } else "/" === u[f] && (c.push(u.substring(l, f + 1)), l = -1);
            }

            return -1 !== l && c.push(u.substr(l)), t.substr(0, t.length - s.length) + c.join("");
          }

          return -1 !== e.indexOf(":") ? B && ":" === e[1] && "\\" === e[2] && e[0].match(/[a-z]/i) ? "file:///" + e.replace(/\\/g, "/") : e : void 0;
        }

        function a(e) {
          if (e.values) return e.values();
          if ("undefined" == typeof Symbol || !Symbol.iterator) throw new Error("Symbol.iterator not supported in this browser");
          var t = {};
          return t[Symbol.iterator] = function () {
            var t = Object.keys(e),
                r = 0;
            return {
              next: function next() {
                return r < t.length ? {
                  value: e[t[r++]],
                  done: !1
                } : {
                  value: void 0,
                  done: !0
                };
              }
            };
          }, t;
        }

        function u() {
          this.registry = new f();
        }

        function c(e) {
          if (!(e instanceof p)) throw new TypeError("Module instantiation did not return a valid namespace object.");
          return e;
        }

        function l(e) {
          if (void 0 === e) throw new RangeError("No resolution found.");
          return e;
        }

        function f() {
          this[re] = {};
        }

        function p(e) {
          Object.defineProperty(this, ne, {
            value: e
          }), Object.keys(e).forEach(d, this);
        }

        function d(e) {
          Object.defineProperty(this, e, {
            enumerable: !0,
            get: function get() {
              return this[ne][e];
            }
          });
        }

        function h() {
          u.call(this);
          var e = this.registry.delete;

          this.registry.delete = function (r) {
            var n = e.call(this, r);
            return t.hasOwnProperty(r) && !t[r].linkRecord && (delete t[r], n = !0), n;
          };

          var t = {};
          this[oe] = {
            lastRegister: void 0,
            records: t
          }, this.trace = !1;
        }

        function v(e, t, r) {
          return e.records[t] = {
            key: t,
            registration: r,
            module: void 0,
            importerSetters: void 0,
            loadError: void 0,
            evalError: void 0,
            linkRecord: {
              instantiatePromise: void 0,
              dependencies: void 0,
              execute: void 0,
              executingRequire: !1,
              moduleObj: void 0,
              setters: void 0,
              depsInstantiatePromise: void 0,
              dependencyInstantiations: void 0
            }
          };
        }

        function m(e, t, r, n, o) {
          var i = n[t];
          if (i) return Promise.resolve(i);
          var s = o.records[t];
          return s && !s.module ? s.loadError ? Promise.reject(s.loadError) : b(e, s, s.linkRecord, n, o) : e.resolve(t, r).then(function (t) {
            if (i = n[t]) return i;
            if ((s = o.records[t]) && !s.module || (s = v(o, t, s && s.registration)), s.loadError) return Promise.reject(s.loadError);
            var r = s.linkRecord;
            return r ? b(e, s, r, n, o) : s;
          });
        }

        function y(e, t, r) {
          return function () {
            var e = r.lastRegister;
            return e ? (r.lastRegister = void 0, t.registration = e, !0) : !!t.registration;
          };
        }

        function b(e, t, r, n, i) {
          return r.instantiatePromise || (r.instantiatePromise = (t.registration ? Promise.resolve() : Promise.resolve().then(function () {
            return i.lastRegister = void 0, e[ie](t.key, e[ie].length > 1 && y(e, t, i));
          })).then(function (o) {
            if (void 0 !== o) {
              if (!(o instanceof p)) throw new TypeError("Instantiate did not return a valid Module object.");
              return delete i.records[t.key], e.trace && w(e, t, r), n[t.key] = o;
            }

            var s = t.registration;
            if (t.registration = void 0, !s) throw new TypeError("Module instantiation did not call an anonymous or correctly named System.register.");
            return r.dependencies = s[0], t.importerSetters = [], r.moduleObj = {}, s[2] ? (r.moduleObj.default = r.moduleObj.__useDefault = {}, r.executingRequire = s[1], r.execute = s[2]) : E(e, t, r, s[1]), t;
          }).catch(function (e) {
            throw t.linkRecord = void 0, t.loadError = t.loadError || o(e, "Instantiating " + t.key);
          }));
        }

        function g(e, t, r, n, o, i) {
          return e.resolve(t, r).then(function (r) {
            i && (i[t] = r);
            var s = o.records[r],
                a = n[r];
            if (a && (!s || s.module && a !== s.module)) return a;
            if (s && s.loadError) throw s.loadError;
            (!s || !a && s.module) && (s = v(o, r, s && s.registration));
            var u = s.linkRecord;
            return u ? b(e, s, u, n, o) : s;
          });
        }

        function w(e, t, r) {
          e.loads = e.loads || {}, e.loads[t.key] = {
            key: t.key,
            deps: r.dependencies,
            dynamicDeps: [],
            depMap: r.depMap || {}
          };
        }

        function E(e, t, r, n) {
          var o = r.moduleObj,
              i = t.importerSetters,
              s = !1,
              a = n.call(X, function (e, t) {
            if ("object" == _typeof(e)) {
              var r = !1;

              for (var n in e) {
                t = e[n], "__useDefault" === n || n in o && o[n] === t || (r = !0, o[n] = t);
              }

              if (!1 === r) return t;
            } else {
              if ((s || e in o) && o[e] === t) return t;
              o[e] = t;
            }

            for (var a = 0; a < i.length; a++) {
              i[a](o);
            }

            return t;
          }, new R(e, t.key));
          r.setters = a.setters, r.execute = a.execute, a.exports && (r.moduleObj = o = a.exports, s = !0);
        }

        function O(e, t, r, n, i) {
          if (r.depsInstantiatePromise) return r.depsInstantiatePromise;

          for (var s = Array(r.dependencies.length), a = 0; a < r.dependencies.length; a++) {
            s[a] = g(e, r.dependencies[a], t.key, n, i, e.trace && r.depMap || (r.depMap = {}));
          }

          var u = Promise.all(s).then(function (e) {
            if (r.dependencyInstantiations = e, r.setters) for (var n = 0; n < e.length; n++) {
              var o = r.setters[n];

              if (o) {
                var i = e[n];
                if (i instanceof p) o(i);else {
                  if (i.loadError) throw i.loadError;
                  o(i.module || i.linkRecord.moduleObj), i.importerSetters && i.importerSetters.push(o);
                }
              }
            }
            return t;
          });
          return e.trace && (u = u.then(function () {
            return w(e, t, r), t;
          })), (u = u.catch(function (e) {
            throw r.depsInstantiatePromise = void 0, o(e, "Loading " + t.key);
          })).catch(function () {}), r.depsInstantiatePromise = u;
        }

        function S(e, t, r, n, o) {
          return new Promise(function (r, i) {
            function s(t) {
              var r = t.linkRecord;
              r && -1 === u.indexOf(t) && (u.push(t), c++, O(e, t, r, n, o).then(a, i));
            }

            function a(e) {
              c--;
              var t = e.linkRecord;
              if (t) for (var n = 0; n < t.dependencies.length; n++) {
                var o = t.dependencyInstantiations[n];
                o instanceof p || s(o);
              }
              0 === c && r();
            }

            var u = [],
                c = 0;
            s(t);
          });
        }

        function R(e, t) {
          this.loader = e, this.key = this.id = t, this.meta = {
            url: t
          };
        }

        function T(e, t, r, n, o, i) {
          if (t.module) return t.module;
          if (t.evalError) throw t.evalError;
          if (i && -1 !== i.indexOf(t)) return t.linkRecord.moduleObj;
          var s = j(e, t, r, n, o, r.setters ? [] : i || []);
          if (s) throw s;
          return t.module;
        }

        function k(e, t, r, n, o, i, s) {
          return function (a) {
            for (var u = 0; u < r.length; u++) {
              if (r[u] === a) {
                var c,
                    l = n[u];
                return c = l instanceof p ? l : T(e, l, l.linkRecord, o, i, s), "__useDefault" in c ? c.__useDefault : c;
              }
            }

            throw new Error("Module " + a + " not declared as a System.registerDynamic dependency of " + t);
          };
        }

        function j(e, t, r, n, i, s) {
          s.push(t);
          var a;
          if (r.setters) for (var u, c, l = 0; l < r.dependencies.length; l++) {
            if (!((u = r.dependencyInstantiations[l]) instanceof p) && ((c = u.linkRecord) && -1 === s.indexOf(u) && (a = u.evalError ? u.evalError : j(e, u, c, n, i, c.setters ? s : [])), a)) return t.linkRecord = void 0, t.evalError = o(a, "Evaluating " + t.key), t.evalError;
          }
          if (r.execute) if (r.setters) a = x(r.execute);else {
            var f = {
              id: t.key
            },
                d = r.moduleObj;
            Object.defineProperty(f, "exports", {
              configurable: !0,
              set: function set(e) {
                d.default = d.__useDefault = e;
              },
              get: function get() {
                return d.__useDefault;
              }
            });
            var h = k(e, t.key, r.dependencies, r.dependencyInstantiations, n, i, s);
            if (!r.executingRequire) for (l = 0; l < r.dependencies.length; l++) {
              h(r.dependencies[l]);
            }
            a = P(r.execute, h, d.default, f), f.exports !== d.__useDefault && (d.default = d.__useDefault = f.exports);
            var v = d.default;
            if (v && v.__esModule) for (var m in v) {
              Object.hasOwnProperty.call(v, m) && (d[m] = v[m]);
            }
          }
          if (t.linkRecord = void 0, a) return t.evalError = o(a, "Evaluating " + t.key);

          if (n[t.key] = t.module = new p(r.moduleObj), !r.setters) {
            if (t.importerSetters) for (l = 0; l < t.importerSetters.length; l++) {
              t.importerSetters[l](t.module);
            }
            t.importerSetters = void 0;
          }
        }

        function x(e) {
          try {
            e.call(se);
          } catch (e) {
            return e;
          }
        }

        function P(e, t, r, n) {
          try {
            var o = e.call(X, t, r, n);
            void 0 !== o && (n.exports = o);
          } catch (e) {
            return e;
          }
        }

        function U(e) {
          return void 0 === ae && (ae = "undefined" != typeof Symbol && !!Symbol.toStringTag), e instanceof p || ae && "[object Module]" == Object.prototype.toString.call(e);
        }

        function C(e, t, r) {
          var n = new Uint8Array(t);
          return 0 === n[0] && 97 === n[1] && 115 === n[2] ? WebAssembly.compile(t).then(function (t) {
            var n = [],
                o = [],
                i = {};
            return WebAssembly.Module.imports && WebAssembly.Module.imports(t).forEach(function (e) {
              var t = e.module;
              o.push(function (e) {
                i[t] = e;
              }), -1 === n.indexOf(t) && n.push(t);
            }), e.register(n, function (e) {
              return {
                setters: o,
                execute: function execute() {
                  e(new WebAssembly.Instance(t, i).exports);
                }
              };
            }), r(), !0;
          }) : Promise.resolve(!1);
        }

        function _(e, t) {
          for (var r in t) {
            Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }

          return e;
        }

        function L(e) {
          if (he || ve) {
            var t = document.createElement("link");
            he ? (t.rel = "preload", t.as = "script") : t.rel = "prefetch", t.href = e, document.head.appendChild(t);
          } else new Image().src = e;
        }

        function N(e, t, r) {
          try {
            importScripts(e);
          } catch (e) {
            r(e);
          }

          t();
        }

        function M(e, t, r, n, o) {
          function i() {
            n(), a();
          }

          function s(t) {
            a(), o(new Error("Fetching " + e));
          }

          function a() {
            for (var e = 0; e < me.length; e++) {
              if (me[e].err === s) {
                me.splice(e, 1);
                break;
              }
            }

            u.removeEventListener("load", i, !1), u.removeEventListener("error", s, !1), document.head.removeChild(u);
          }

          if (e = e.replace(/#/g, "%23"), de) return N(e, n, o);
          var u = document.createElement("script");
          u.type = "text/javascript", u.charset = "utf-8", u.async = !0, t && (u.crossOrigin = t), r && (u.integrity = r), u.addEventListener("load", i, !1), u.addEventListener("error", s, !1), u.src = e, document.head.appendChild(u);
        }

        function A(e, t, r) {
          var n = H(t, r);

          if (n) {
            var o = t[n] + r.substr(n.length),
                i = s(o, q);
            return void 0 !== i ? i : e + o;
          }

          return -1 !== r.indexOf(":") ? r : e + r;
        }

        function I(e) {
          var t = this.name;

          if (t.substr(0, e.length) === e && (t.length === e.length || "/" === t[e.length] || "/" === e[e.length - 1] || ":" === e[e.length - 1])) {
            var r = e.split("/").length;
            r > this.len && (this.match = e, this.len = r);
          }
        }

        function H(e, t) {
          if (Object.hasOwnProperty.call(e, t)) return t;
          var r = {
            name: t,
            match: void 0,
            len: 0
          };
          return Object.keys(e).forEach(I, r), r.match;
        }

        function D() {
          h.call(this), this[le] = {
            baseURL: q,
            paths: {},
            map: {},
            submap: {},
            bundles: {},
            depCache: {},
            wasm: !1
          }, this.registry.set("@empty", ce);
        }

        function G(e, t) {
          var r = this[le];

          if (t) {
            var n = H(r.submap, t),
                o = r.submap[n];
            if (a = o && H(o, e)) return s(u = o[a] + e.substr(a.length), n) || u;
          }

          var i = r.map,
              a = H(i, e);

          if (a) {
            var u = i[a] + e.substr(a.length);
            return s(u, t || r.baseURL) || u;
          }
        }

        function F(e, t) {
          return new Promise(function (r, n) {
            return M(e, "anonymous", void 0, function () {
              t(), r();
            }, n);
          });
        }

        function W(e, t) {
          var r = this[le],
              n = r.wasm,
              o = r.bundles[e];

          if (o) {
            var i = (c = this).resolveSync(o, void 0);
            if (c.registry.has(i)) return;
            return ge[i] || (ge[i] = F(i, t).then(function () {
              c.registry.has(i) || c.registry.set(i, c.newModule({})), delete ge[i];
            }));
          }

          var s = r.depCache[e];
          if (s) for (var a = n ? fetch : L, u = 0; u < s.length; u++) {
            this.resolve(s[u], e).then(a);
          }

          if (n) {
            var c = this;
            return fetch(e).then(function (e) {
              if (e.ok) return e.arrayBuffer();
              throw new Error("Fetch error: " + e.status + " " + e.statusText);
            }).then(function (r) {
              return C(c, r, t).then(function (n) {
                if (!n) {
                  var o = new TextDecoder("utf-8").decode(new Uint8Array(r));
                  (0, eval)(o + "\n//# sourceURL=" + e), t();
                }
              });
            });
          }

          return F(e, t);
        }

        var q,
            z = "undefined" != typeof window && "undefined" != typeof document,
            B = void 0 !== t && t.versions && t.versions.node,
            J = void 0 !== t && "string" == typeof t.platform && t.platform.match(/^win/),
            X = "undefined" != typeof self ? self : r,
            $ = "undefined" != typeof Symbol;

        if ("undefined" != typeof document && document.getElementsByTagName) {
          if (!(q = document.baseURI)) {
            var K = document.getElementsByTagName("base");
            q = K[0] && K[0].href || window.location.href;
          }
        } else "undefined" != typeof location && (q = location.href);

        if (q) {
          var Q = (q = q.split("#")[0].split("?")[0]).lastIndexOf("/");
          -1 !== Q && (q = q.substr(0, Q + 1));
        } else {
          if (void 0 === t || !t.cwd) throw new TypeError("No environment baseURI");
          q = "file://" + (J ? "/" : "") + t.cwd(), J && (q = q.replace(/\\/g, "/"));
        }

        "/" !== q[q.length - 1] && (q += "/");
        var V = "_" == new Error(0, "_").fileName,
            Y = Promise.resolve();
        u.prototype.constructor = u, u.prototype.import = function (e, t) {
          if ("string" != typeof e) throw new TypeError("Loader import method must be passed a module key string");
          var r = this;
          return Y.then(function () {
            return r[ee](e, t);
          }).then(c).catch(function (r) {
            throw o(r, "Loading " + e + (t ? " from " + t : ""));
          });
        };
        var Z = u.resolve = n("resolve"),
            ee = u.resolveInstantiate = n("resolveInstantiate");
        u.prototype[ee] = function (e, t) {
          var r = this;
          return r.resolve(e, t).then(function (e) {
            return r.registry.get(e);
          });
        }, u.prototype.resolve = function (e, t) {
          var r = this;
          return Y.then(function () {
            return r[Z](e, t);
          }).then(l).catch(function (r) {
            throw o(r, "Resolving " + e + (t ? " to " + t : ""));
          });
        };
        var te = "undefined" != typeof Symbol && Symbol.iterator,
            re = n("registry");
        te && (f.prototype[Symbol.iterator] = function () {
          return this.entries()[Symbol.iterator]();
        }, f.prototype.entries = function () {
          var e = this[re];
          return a(Object.keys(e).map(function (t) {
            return [t, e[t]];
          }));
        }), f.prototype.keys = function () {
          return a(Object.keys(this[re]));
        }, f.prototype.values = function () {
          var e = this[re];
          return a(Object.keys(e).map(function (t) {
            return e[t];
          }));
        }, f.prototype.get = function (e) {
          return this[re][e];
        }, f.prototype.set = function (e, t) {
          if (!(t instanceof p)) throw new Error("Registry must be set with an instance of Module Namespace");
          return this[re][e] = t, this;
        }, f.prototype.has = function (e) {
          return Object.hasOwnProperty.call(this[re], e);
        }, f.prototype.delete = function (e) {
          return !!Object.hasOwnProperty.call(this[re], e) && (delete this[re][e], !0);
        };
        var ne = n("baseObject");
        p.prototype = Object.create(null), "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(p.prototype, Symbol.toStringTag, {
          value: "Module"
        });
        var oe = n("register-internal");
        h.prototype = Object.create(u.prototype), h.prototype.constructor = h;
        var ie = h.instantiate = n("instantiate");
        h.prototype[h.resolve = u.resolve] = function (e, t) {
          return s(e, t || q);
        }, h.prototype[ie] = function (e, t) {}, h.prototype[u.resolveInstantiate] = function (e, t) {
          var r = this,
              n = this[oe],
              o = this.registry[re];
          return m(r, e, t, o, n).then(function (e) {
            if (e instanceof p) return e;
            var t = e.linkRecord;

            if (!t) {
              if (e.module) return e.module;
              throw e.evalError;
            }

            return S(r, e, t, o, n).then(function () {
              return T(r, e, t, o, n, void 0);
            });
          });
        }, h.prototype.register = function (e, t, r) {
          var n = this[oe];
          void 0 === r ? n.lastRegister = [e, t, void 0] : (n.records[e] || v(n, e, void 0)).registration = [t, r, void 0];
        }, h.prototype.registerDynamic = function (e, t, r, n) {
          var o = this[oe];
          "string" != typeof e ? o.lastRegister = [e, t, r] : (o.records[e] || v(o, e, void 0)).registration = [t, r, n];
        }, R.prototype.import = function (e) {
          return this.loader.trace && this.loader.loads[this.key].dynamicDeps.push(e), this.loader.import(e, this.key);
        };
        var se = {};
        Object.freeze && Object.freeze(se);
        var ae,
            ue = Promise.resolve(),
            ce = new p({}),
            le = n("loader-config"),
            fe = n("plain-resolve"),
            pe = n("plain-resolve-sync"),
            de = "undefined" == typeof window && "undefined" != typeof self && "undefined" != typeof importScripts,
            he = !1,
            ve = !1;

        if (z && function () {
          var e = document.createElement("link").relList;

          if (e && e.supports) {
            ve = !0;

            try {
              he = e.supports("preload");
            } catch (e) {}
          }
        }(), z) {
          var me = [],
              ye = window.onerror;

          window.onerror = function (e, t) {
            for (var r = 0; r < me.length; r++) {
              if (me[r].src === t) return void me[r].err(e);
            }

            ye && ye.apply(this, arguments);
          };
        }

        D.plainResolve = fe, D.plainResolveSync = pe;
        var be = D.prototype = Object.create(h.prototype);
        be.constructor = D, be[D.resolve = h.resolve] = function (e, t) {
          var r = s(e, t || q);
          if (void 0 !== r) return Promise.resolve(r);
          var n = this;
          return ue.then(function () {
            return n[fe](e, t);
          }).then(function (t) {
            if (t = t || e, n.registry.has(t)) return t;
            var r = n[le];
            return A(r.baseURL, r.paths, t);
          });
        }, be.newModule = function (e) {
          return new p(e);
        }, be.isModule = U, be.resolveSync = function (e, t) {
          var r = s(e, t || q);
          if (void 0 !== r) return r;
          if (r = this[pe](e, t) || e, this.registry.has(r)) return r;
          var n = this[le];
          return A(n.baseURL, n.paths, r);
        }, be.import = function () {
          return h.prototype.import.apply(this, arguments).then(function (e) {
            return "__useDefault" in e ? e.__useDefault : e;
          });
        }, be[fe] = be[pe] = G, be[D.instantiate = h.instantiate] = W, be.config = function (e) {
          var t = this[le];

          if (e.baseURL && (t.baseURL = s(e.baseURL, q) || s("./" + e.baseURL, q), "/" !== t.baseURL[t.baseURL.length - 1] && (t.baseURL += "/")), e.paths && _(t.paths, e.paths), e.map) {
            n = e.map;

            for (var r in n) {
              Object.hasOwnProperty.call(n, r) && ("string" == typeof (o = n[r]) ? t.map[r] = o : (a = s(r, q) || A(t.baseURL, t.paths, r), _(t.submap[a] || (t.submap[a] = {}), o)));
            }
          }

          for (var r in e) {
            if (Object.hasOwnProperty.call(e, r)) {
              var n = e[r];

              switch (r) {
                case "baseURL":
                case "paths":
                case "map":
                  break;

                case "bundles":
                  for (var r in n) {
                    if (Object.hasOwnProperty.call(n, r)) for (var o = n[r], i = 0; i < o.length; i++) {
                      t.bundles[this.resolveSync(o[i], void 0)] = r;
                    }
                  }

                  break;

                case "depCache":
                  for (var r in n) {
                    if (Object.hasOwnProperty.call(n, r)) {
                      var a = this.resolveSync(r, void 0);
                      t.depCache[a] = (t.depCache[a] || []).concat(n[r]);
                    }
                  }

                  break;

                case "wasm":
                  t.wasm = "undefined" != typeof WebAssembly && !!n;
                  break;

                default:
                  throw new TypeError('The SystemJS production build does not support the "' + r + '" configuration option.');
              }
            }
          }
        }, be.getConfig = function (e) {
          var t = this[le],
              r = {};

          _(r, t.map);

          for (var n in t.submap) {
            Object.hasOwnProperty.call(t.submap, n) && (r[n] = _({}, t.submap[n]));
          }

          var o = {};

          for (var n in t.depCache) {
            Object.hasOwnProperty.call(t.depCache, n) && (o[n] = [].concat(t.depCache[n]));
          }

          var i = {};

          for (var n in t.bundles) {
            Object.hasOwnProperty.call(t.bundles, n) && (i[n] = [].concat(t.bundles[n]));
          }

          return {
            baseURL: t.baseURL,
            paths: _({}, t.paths),
            depCache: o,
            bundles: i,
            map: r,
            wasm: t.wasm
          };
        }, be.register = function (e, t, r) {
          return "string" == typeof e && (e = this.resolveSync(e, void 0)), h.prototype.register.call(this, e, t, r);
        }, be.registerDynamic = function (e, t, r, n) {
          return "string" == typeof e && (e = this.resolveSync(e, void 0)), h.prototype.registerDynamic.call(this, e, t, r, n);
        };
        var ge = {};
        D.prototype.version = "0.20.19 Production";
        var we = new D();
        if (z || de) if (X.SystemJS = we, X.System) {
          var Ee = X.System.register;

          X.System.register = function () {
            Ee && Ee.apply(this, arguments), we.register.apply(we, arguments);
          };
        } else X.System = we;
        void 0 !== e && e.exports && (e.exports = we);
      }();
    }).call(t, r(2), r(3));
  }, function (e, t) {
    function r() {
      throw new Error("setTimeout has not been defined");
    }

    function n() {
      throw new Error("clearTimeout has not been defined");
    }

    function o(e) {
      if (l === setTimeout) return setTimeout(e, 0);
      if ((l === r || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);

      try {
        return l(e, 0);
      } catch (t) {
        try {
          return l.call(null, e, 0);
        } catch (t) {
          return l.call(this, e, 0);
        }
      }
    }

    function i(e) {
      if (f === clearTimeout) return clearTimeout(e);
      if ((f === n || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);

      try {
        return f(e);
      } catch (t) {
        try {
          return f.call(null, e);
        } catch (t) {
          return f.call(this, e);
        }
      }
    }

    function s() {
      v && d && (v = !1, d.length ? h = d.concat(h) : m = -1, h.length && a());
    }

    function a() {
      if (!v) {
        var e = o(s);
        v = !0;

        for (var t = h.length; t;) {
          for (d = h, h = []; ++m < t;) {
            d && d[m].run();
          }

          m = -1, t = h.length;
        }

        d = null, v = !1, i(e);
      }
    }

    function u(e, t) {
      this.fun = e, this.array = t;
    }

    function c() {}

    var l,
        f,
        p = e.exports = {};
    !function () {
      try {
        l = "function" == typeof setTimeout ? setTimeout : r;
      } catch (e) {
        l = r;
      }

      try {
        f = "function" == typeof clearTimeout ? clearTimeout : n;
      } catch (e) {
        f = n;
      }
    }();
    var d,
        h = [],
        v = !1,
        m = -1;
    p.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) {
        t[r - 1] = arguments[r];
      }
      h.push(new u(e, t)), 1 !== h.length || v || o(a);
    }, u.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = c, p.addListener = c, p.once = c, p.off = c, p.removeListener = c, p.removeAllListeners = c, p.emit = c, p.prependListener = c, p.prependOnceListener = c, p.listeners = function (e) {
      return [];
    }, p.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, p.cwd = function () {
      return "/";
    }, p.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, p.umask = function () {
      return 0;
    };
  }, function (e, t) {
    var r;

    r = function () {
      return this;
    }();

    try {
      r = r || Function("return this")() || (0, eval)("this");
    } catch (e) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (r = window);
    }

    e.exports = r;
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);