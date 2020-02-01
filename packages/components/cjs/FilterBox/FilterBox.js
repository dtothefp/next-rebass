"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _rebass = require("rebass");

var _forms = require("@rebass/forms");

var _redux = require("@css/redux");

const {
  filterItem,
  removeFilterItem
} = _redux.actions;

var _default = () => {
  const {
    dispatch
  } = (0, _react.useContext)(_redux.StoreContext);

  const handleInputChange = e => {
    const {
      checked,
      name
    } = e.target;
    dispatch(checked ? filterItem(name) : removeFilterItem(name));
  };

  return __jsx(_rebass.Box, {
    width: 1 / 4
  }, __jsx("form", null, __jsx(_forms.Label, null, __jsx(_forms.Checkbox, {
    name: "created",
    onChange: handleInputChange
  }), "Created"), __jsx(_forms.Label, null, __jsx(_forms.Checkbox, {
    name: "cooked",
    onChange: handleInputChange
  }), "Cooked")));
};

exports.default = _default;