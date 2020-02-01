"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

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
  return __jsx(_rebass.Flex, {
    as: "form",
    onSubmit: handleSubmit
  }, __jsx(_rebass.Box, {
    width: 1 / 6
  }, __jsx(_rebass.Text, {
    m: 0
  }, eventName)), __jsx(_rebass.Box, {
    width: 1 / 3
  }, __jsx(_forms.Input, {
    type: "text",
    name: "name",
    value: name,
    onChange: handleChange
  })), __jsx(_rebass.Box, {
    width: 1 / 3
  }, __jsx(_forms.Input, {
    type: "text",
    name: "destination",
    value: destination,
    onChange: handleChange
  })), __jsx(_rebass.Box, {
    width: 1 / 6
  }, __jsx(_rebass.Button, null, "Update")));
});

exports.default = _default;