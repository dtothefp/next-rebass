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

var _redux = require("@css/redux");

const {
  changeItemView
} = _redux.actions;
const {
  ACTIVE_VIEW,
  HISTORICAL_VIEW
} = _redux.constants;

const ViewButton = ({
  selected,
  children,
  handleClick
}) => {
  const sx = {
    cursor: `pointer`,
    borderRadius: `0`
  };

  if (selected) {
    Object.assign(sx, {
      borderStyle: `solid`,
      borderWidth: `1px`,
      borderTop: `0`,
      borderBottom: `0`,
      borderColor: `secondary`
    });
  }

  return _react.default.createElement(_rebass.Button, {
    sx: sx,
    bg: selected ? `gray` : `white`,
    color: "black",
    width: 1 / 2,
    onClick: handleClick,
    disabled: selected
  }, children);
};

ViewButton.propTypes = {
  selected: _propTypes.default.bool,
  children: _propTypes.default.node,
  handleClick: _propTypes.default.func
};

const ItemsNav = () => {
  const {
    dispatch,
    state: {
      view
    }
  } = (0, _react.useContext)(_redux.StoreContext);

  const handleClick = view => () => {
    dispatch(changeItemView(view));
  };

  return _react.default.createElement(_rebass.Box, {
    pt: 5,
    sx: {
      position: `relative`,
      borderStyle: `solid`,
      borderWidth: `1px`,
      borderTop: `0`,
      borderLeft: `0`,
      borderRight: `0`,
      borderColor: `secondary`
    }
  }, _react.default.createElement(_rebass.Flex, {
    sx: {
      position: `absolute`,
      top: `0`,
      left: `0`
    },
    height: "100%",
    width: "100%"
  }, _react.default.createElement(ViewButton, {
    selected: view === ACTIVE_VIEW,
    handleClick: handleClick(ACTIVE_VIEW)
  }, "Active Orders"), _react.default.createElement(ViewButton, {
    selected: view === HISTORICAL_VIEW,
    handleClick: handleClick(HISTORICAL_VIEW)
  }, "Historical Orders")));
};

var _default = ItemsNav;
exports.default = _default;