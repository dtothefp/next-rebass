"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rebass = require("rebass");

var _forms = require("@rebass/forms");

var _default = (0, _react.memo)(function Item({
  eventName,
  name,
  destination,
  disabled,
  handleChange,
  handleSubmit
}) {
  return _react.default.createElement(_rebass.Flex, {
    as: "form",
    onSubmit: handleSubmit
  }, _react.default.createElement(_rebass.Box, {
    width: 1 / 6
  }, _react.default.createElement(_rebass.Text, {
    m: 0
  }, eventName)), _react.default.createElement(_rebass.Box, {
    width: 1 / 3
  }, _react.default.createElement(_forms.Input, {
    type: "text",
    name: "name",
    value: name,
    onChange: handleChange
  })), _react.default.createElement(_rebass.Box, {
    width: 1 / 3
  }, _react.default.createElement(_forms.Input, {
    type: "text",
    name: "destination",
    value: destination,
    onChange: handleChange
  })), _react.default.createElement(_rebass.Box, {
    width: 1 / 6
  }, _react.default.createElement(_rebass.Button, null, "Update")));
});

exports.default = _default;