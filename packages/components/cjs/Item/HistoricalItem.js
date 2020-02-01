"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

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
  return __jsx(FlexContainer, null, __jsx("div", null, __jsx(Item, null, eventName)), __jsx("div", null, __jsx(Item, null, name)), __jsx("div", null, __jsx(Item, null, destination)));
});

exports.default = _default;