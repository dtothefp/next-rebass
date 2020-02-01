"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _rebass = require("rebass");

var _FilterBox = _interopRequireDefault(require("../FilterBox/FilterBox"));

var _Items = _interopRequireDefault(require("../Items/Items"));

var _default = () => _react.default.createElement(_rebass.Flex, null, _react.default.createElement(_FilterBox.default, null), _react.default.createElement(_Items.default, null));

exports.default = _default;