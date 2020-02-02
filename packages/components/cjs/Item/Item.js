"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rebass = require("rebass");

var _forms = require("@rebass/forms");

var _icons = _interopRequireDefault(require("@css/icons"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

const eventKeys = ['CREATED', 'COOKED', 'DRIVER_RECEIVED', 'DELIVERED', 'CANCELLED'];
const iconSvgs = eventKeys.reduce((acc, key) => {
  const Icon = (0, _styled.default)(_icons.default[key.toLowerCase()])`
    height: 35px;
    width: 35px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `;
  return { ...acc,
    [key]: Icon
  };
}, {});
const iconDict = {
  CREATED: 'Order Created',
  COOKED: 'Cooked',
  DRIVER_RECEIVED: 'Driver Recieved',
  DELIVERED: 'Delivered',
  CANCELLED: 'Canceled'
};

const EventIcon = ({
  event
}) => {
  const Icon = iconSvgs[event];
  return _react.default.createElement(_rebass.Box, {
    sx: {
      position: 'relative'
    }
  }, _react.default.createElement(Icon, null));
};

const DataInput = ({
  disabled,
  handleChange,
  name,
  value
}) => _react.default.createElement(_rebass.Box, {
  width: "40%"
}, _react.default.createElement(_forms.Input, {
  type: "text",
  name: name,
  value: value,
  onChange: handleChange,
  p: 1,
  sx: {
    borderStyle: 'none'
  },
  disabled: disabled
}));

const animation = (0, _styledComponents.keyframes)`
  0% { background-position-x: 100% }
  100% { background-position-x: 0% }
`;
const bgc = '#efefefef';
const Container = (0, _styledComponents.default)(_rebass.Box)`
  display: flex;
  height: 50px;
  padding: 10px;
  background-image: ${({
  idx
}) => idx % 2 === 0 ? `linear-gradient(-45deg, ${bgc} 35%, white, ${bgc} 65%, ${bgc})` : 'none'};
  background-position-y: 50%;
  background-size: 300%;
  animation: 1.5s ${animation} infinite;
`;

var _default = (0, _react.memo)(function Item({
  eventName,
  name,
  destination,
  disabled,
  handleChange,
  handleSubmit,
  idx,
  loading,
  view,
  updating
}) {
  if (loading) {
    return _react.default.createElement(Container, {
      idx: idx
    });
  }

  const isHistorical = view === `historical`;
  return _react.default.createElement(_rebass.Flex, {
    as: "form",
    p: 2,
    bg: idx % 2 === 0 ? 'gray' : false,
    onSubmit: handleSubmit
  }, _react.default.createElement(_rebass.Box, {
    width: "10%"
  }, _react.default.createElement(EventIcon, {
    event: eventName
  })), _react.default.createElement(DataInput, {
    name: "name",
    value: name,
    handleChange: handleChange,
    disabled: isHistorical || updating
  }), _react.default.createElement(DataInput, {
    name: "destination",
    value: destination,
    handleChange: handleChange,
    disabled: isHistorical || updating
  }), _react.default.createElement(_rebass.Box, {
    width: "10%"
  }, _react.default.createElement(_rebass.Button, {
    sx: {
      borderRadius: '0',
      cursor: 'pointer',
      display: isHistorical ? 'none' : false
    },
    bg: "muted",
    width: "100%"
  }, "Update")));
});

exports.default = _default;