"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

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

  return _react.default.createElement(_rebass.Box, {
    width: 1 / 4
  }, _react.default.createElement("form", null, _react.default.createElement(_forms.Label, null, _react.default.createElement(_forms.Checkbox, {
    name: "created",
    onChange: handleInputChange
  }), "Created"), _react.default.createElement(_forms.Label, null, _react.default.createElement(_forms.Checkbox, {
    name: "cooked",
    onChange: handleInputChange
  }), "Cooked")));
};

exports.default = _default;