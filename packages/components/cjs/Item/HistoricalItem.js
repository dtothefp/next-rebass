"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _system = require("@material-ui/system");

var _styledComponents = _interopRequireDefault(require("styled-components"));

const FlexContainer = _styledComponents.default.form`
  display: flex;
  ${_system.flexbox}
`;
const Item = _styledComponents.default.p`
  margin: 0;
  ${_system.spacing}
`;

var _default = (0, _react.memo)(function Item({
  eventName,
  name,
  destination
}) {
  return _react.default.createElement(FlexContainer, null, _react.default.createElement("div", null, _react.default.createElement(Item, null, eventName)), _react.default.createElement("div", null, _react.default.createElement(Item, null, name)), _react.default.createElement("div", null, _react.default.createElement(Item, null, destination)));
});

exports.default = _default;