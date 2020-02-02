"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _rebass = require("rebass");

var _default = () => _react.default.createElement(_rebass.Flex, {
  bg: "muted",
  p: 3
}, _react.default.createElement(_rebass.Image, {
  width: "150px",
  src: "https://1bnjwh491hvk2hz4dz3av3ku-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/logo.png"
}));

exports.default = _default;