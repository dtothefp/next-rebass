"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  StoreContext: true,
  createStore: true
};
exports.createStore = exports.StoreContext = void 0;

var _react = require("react");

var _store = require("./store");

Object.keys(_store).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _store[key];
    }
  });
});
const StoreContext = (0, _react.createContext)();
exports.StoreContext = StoreContext;

const createStore = (reducer, store = {}) => {
  const [state, dispatch] = (0, _react.useReducer)(reducer, store);
  return {
    state,
    dispatch
  };
};

exports.createStore = createStore;