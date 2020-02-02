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
  width: 50px;
`;

const LogoText = ({
  children
}) => _react.default.createElement(_rebass.Text, {
  fontFamily: "menlo",
  fontSize: 3
}, children);

const CTA = () => _react.default.createElement(_rebass.Box, null, _react.default.createElement(_rebass.Text, null));

var _default = () => _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_rebass.Box, {
  p: 3,
  width: "100%"
}, _react.default.createElement(_rebass.Flex, null, _react.default.createElement(LogoText, null, "Cloud"), _react.default.createElement(_rebass.Box, {
  sx: {
    position: 'relative'
  },
  width: "40px"
}, _react.default.createElement(_rebass.Box, {
  sx: {
    position: 'absolute',
    top: '-35px',
    left: '-4px'
  }
}, _react.default.createElement(HeaderLogo, null))), _react.default.createElement(LogoText, null, "Kitchens"))), _react.default.createElement(_rebass.Box, {
  bg: "muted",
  p: 4,
  pl: 3
}, _react.default.createElement(_rebass.Text, {
  color: "white",
  as: "h2"
}, "Smart Kitchens"), _react.default.createElement(_rebass.Text, {
  color: "white",
  as: "p"
}, "Commercial kitchens optimized for delivery")));

exports.default = _default;