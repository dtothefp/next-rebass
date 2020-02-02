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

var _icons = _interopRequireDefault(require("@css/icons"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _redux = require("@css/redux");

const eventKeys = [`CREATED`, `COOKED`, `DRIVER_RECEIVED`, `DELIVERED`, `CANCELLED`];
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

const EventIcon = ({
  event
}) => {
  const Icon = iconSvgs[event];
  return _react.default.createElement(_rebass.Box, {
    sx: {
      position: `relative`
    }
  }, _react.default.createElement(Icon, null));
};

EventIcon.propTypes = {
  event: _propTypes.default.string
};

const DataInput = ({
  disabled,
  handleChange,
  historical,
  name,
  value
}) => _react.default.createElement(_rebass.Box, {
  width: historical && name === `destination` ? `50%` : `40%`
}, _react.default.createElement(_forms.Input, {
  type: "text",
  name: name,
  value: value,
  onChange: handleChange,
  p: 1,
  sx: {
    borderStyle: `none`
  },
  disabled: disabled
}));

DataInput.propTypes = {
  disabled: _propTypes.default.bool,
  handleChange: _propTypes.default.func,
  historical: _propTypes.default.bool,
  name: _propTypes.default.string,
  value: _propTypes.default.string
}; // HACK: doesn't seem easy to do keyframes in Rebass with Emotion so must use Styled Components. This isn't optimal because
// then we are bundling two styling libs.
// https://github.com/rebassjs/rebass/issues/309
// https://github.com/rebassjs/rebass/issues/309

const animation = (0, _styledComponents.keyframes)`
  0% { background-position-x: 100% }
  100% { background-position-x: 0% }
`;
const bgc = `#efefefef`;

const calculateGradient = ({
  idx
}) => idx % 2 === 0 ? `linear-gradient(-45deg, ${bgc} 35%, white, ${bgc} 65%, ${bgc})` : `none`;

const Container = (0, _styledComponents.default)(_rebass.Box)`
  display: flex;
  height: 50px;
  padding: 10px;
  background-image: ${calculateGradient};
  background-position-y: 50%;
  background-size: 300%;
  animation: 1.5s ${animation} infinite;
`;
const Item = (0, _react.memo)(({
  destination,
  eventName,
  handleChange,
  handleSubmit,
  idx,
  loading,
  name,
  view,
  updating
}) => {
  if (loading) {
    return _react.default.createElement(Container, {
      idx: idx
    });
  }

  const isHistorical = view === _redux.constants.HISTORICAL_VIEW;
  const disabled = isHistorical || updating;
  return _react.default.createElement(_rebass.Flex, {
    as: "form",
    p: 2,
    bg: idx % 2 === 0 ? `gray` : false,
    onSubmit: handleSubmit
  }, _react.default.createElement(_rebass.Box, {
    width: "10%"
  }, _react.default.createElement(EventIcon, {
    event: eventName
  })), _react.default.createElement(DataInput, {
    name: "name",
    value: name,
    handleChange: handleChange,
    disabled: disabled,
    historical: isHistorical
  }), _react.default.createElement(DataInput, {
    name: "destination",
    value: destination,
    handleChange: handleChange,
    disabled: disabled,
    historical: isHistorical
  }), isHistorical ? null : _react.default.createElement(_rebass.Box, {
    width: "10%"
  }, _react.default.createElement(_rebass.Button, {
    disabled: disabled,
    sx: {
      borderRadius: `0`,
      cursor: `pointer`
    },
    bg: "muted",
    width: "100%"
  }, "Update")));
});
Item.propTypes = {
  destination: _propTypes.default.string,
  eventName: _propTypes.default.string,
  handleChange: _propTypes.default.func,
  handleSubmit: _propTypes.default.func,
  idx: _propTypes.default.number,
  loading: _propTypes.default.bool,
  updating: _propTypes.default.bool,
  name: _propTypes.default.string,
  view: _propTypes.default.string
};
var _default = Item;
exports.default = _default;