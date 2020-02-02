"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rebass = require("rebass");

var _forms = require("@rebass/forms");

var _redux = require("@css/redux");

const {
  filterItem,
  removeFilterItem
} = _redux.actions;

const FilterInput = ({
  bottom,
  children,
  handleChange,
  name
}) => _react.default.createElement(_forms.Label, {
  sx: {
    borderStyle: `solid`,
    borderWidth: `1px`,
    borderLeft: `0`,
    borderRight: `0`,
    borderBottom: bottom ? false : `0`,
    borderColor: `secondary`
  },
  py: 2,
  pl: 2
}, _react.default.createElement(_forms.Checkbox, {
  name: name,
  onChange: handleChange,
  sx: {
    position: `relative`,
    top: `-4px`,
    backgroundColor: `transparent !important`
  }
}), children);

FilterInput.propTypes = {
  bottom: _propTypes.default.bool,
  children: _propTypes.default.node,
  handleChange: _propTypes.default.func,
  name: _propTypes.default.string
};

const FilterBox = () => {
  const {
    dispatch
  } = (0, _react.useContext)(_redux.StoreContext);

  const handleChange = e => {
    const {
      checked,
      name
    } = e.target;
    dispatch(checked ? filterItem(name) : removeFilterItem(name));
  };

  return _react.default.createElement(_rebass.Box, {
    sx: {
      position: `relative`
    },
    width: 1 / 4,
    pt: 5,
    px: 3
  }, _react.default.createElement(_rebass.Card, {
    sx: {
      position: `fixed`,
      borderStyle: `solid`,
      borderWidth: `3px`,
      borderLeft: `0`,
      borderRight: `0`,
      borderColor: `secondary`
    },
    width: "22%",
    p: 0
  }, _react.default.createElement(_rebass.Text, {
    py: 3,
    pl: 2,
    as: "h5",
    fontSize: 2
  }, "Filter Orders By Status"), _react.default.createElement(_rebass.Box, {
    as: "form"
  }, _react.default.createElement(FilterInput, {
    name: "created",
    handleChange: handleChange
  }, "Created"), _react.default.createElement(FilterInput, {
    name: "cooked",
    handleChange: handleChange,
    bottom: true
  }, "Cooked"))));
};

var _default = FilterBox;
exports.default = _default;