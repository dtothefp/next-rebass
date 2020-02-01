"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rebass = require("rebass");

var _FilterBox = _interopRequireDefault(require("../FilterBox/FilterBox"));

var _Items = _interopRequireDefault(require("../Items/Items"));

var _default = () => __jsx(_rebass.Flex, null, __jsx(_FilterBox.default, null), __jsx(_Items.default, null));

exports.default = _default;