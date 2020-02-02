import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject3() {
  const data = _taggedTemplateLiteral(["\n  display: flex;\n  height: 50px;\n  padding: 10px;\n  background-image: ", ";\n  background-position-y: 50%;\n  background-size: 300%;\n  animation: 1.5s ", " infinite;\n"]);

  _templateObject3 = function () {
    return data;
  };

  return data;
}

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n  0% { background-position-x: 100% }\n  100% { background-position-x: 0% }\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    height: 35px;\n    width: 35px;\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n  "]);

  _templateObject = function () {
    return data;
  };

  return data;
}

import React from "react";
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Flex } from 'rebass';
import { Input } from '@rebass/forms';
import icons from '@css/icons';
import styled from '@emotion/styled';
import styledC, { keyframes } from 'styled-components';
import { constants } from '@css/redux';
const eventKeys = ["CREATED", "COOKED", "DRIVER_RECEIVED", "DELIVERED", "CANCELLED"];
const iconSvgs = eventKeys.reduce((acc, key) => {
  const Icon = styled(icons[key.toLowerCase()])(_templateObject());
  return { ...acc,
    [key]: Icon
  };
}, {});

const EventIcon = ({
  event
}) => {
  const Icon = iconSvgs[event];
  return React.createElement(Box, {
    sx: {
      position: "relative"
    }
  }, React.createElement(Icon, null));
};

EventIcon.propTypes = {
  event: PropTypes.string
};

const DataInput = ({
  disabled,
  handleChange,
  historical,
  name,
  value
}) => React.createElement(Box, {
  width: historical && name === "destination" ? "50%" : "40%"
}, React.createElement(Input, {
  type: "text",
  name: name,
  value: value,
  onChange: handleChange,
  p: 1,
  sx: {
    borderStyle: "none"
  },
  disabled: disabled
}));

DataInput.propTypes = {
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  historical: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string
}; // HACK: doesn't seem easy to do keyframes in Rebass with Emotion so must use Styled Components. This isn't optimal because
// then we are bundling two styling libs.
// https://github.com/rebassjs/rebass/issues/309
// https://github.com/rebassjs/rebass/issues/309

const animation = keyframes(_templateObject2());
const bgc = "#efefefef";

const calculateGradient = ({
  idx
}) => idx % 2 === 0 ? "linear-gradient(-45deg, ".concat(bgc, " 35%, white, ").concat(bgc, " 65%, ").concat(bgc, ")") : "none";

const Container = styledC(Box)(_templateObject3(), calculateGradient, animation);
const Item = memo(({
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
    return React.createElement(Container, {
      idx: idx
    });
  }

  const isHistorical = view === constants.HISTORICAL_VIEW;
  const disabled = isHistorical || updating;
  return React.createElement(Flex, {
    as: "form",
    p: 2,
    bg: idx % 2 === 0 ? "gray" : false,
    onSubmit: handleSubmit
  }, React.createElement(Box, {
    width: "10%"
  }, React.createElement(EventIcon, {
    event: eventName
  })), React.createElement(DataInput, {
    name: "name",
    value: name,
    handleChange: handleChange,
    disabled: disabled,
    historical: isHistorical
  }), React.createElement(DataInput, {
    name: "destination",
    value: destination,
    handleChange: handleChange,
    disabled: disabled,
    historical: isHistorical
  }), isHistorical ? null : React.createElement(Box, {
    width: "10%"
  }, React.createElement(Button, {
    disabled: disabled,
    sx: {
      borderRadius: "0",
      cursor: "pointer"
    },
    bg: "muted",
    width: "100%"
  }, "Update")));
});
Item.propTypes = {
  destination: PropTypes.string,
  eventName: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  idx: PropTypes.number,
  loading: PropTypes.bool,
  updating: PropTypes.bool,
  name: PropTypes.string,
  view: PropTypes.string
};
export default Item;