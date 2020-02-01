"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _rebass = require("rebass");

var _icons = _interopRequireDefault(require("@css/icons"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

const HeaderLogo = (0, _styled.default)(_icons.default.logo)`
  width: 100px;
`;

var _default = () => _react.default.createElement(_rebass.Box, {
  p: 5,
  width: "100%"
}, _react.default.createElement(HeaderLogo, null));

exports.default = _default;