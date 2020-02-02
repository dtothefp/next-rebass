import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  width: 50px;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

import React from "react";
import { Text, Box, Flex } from 'rebass';
import icons from '@css/icons';
import styled from '@emotion/styled';
const HeaderLogo = styled(icons.logo)(_templateObject());

const LogoText = ({
  children
}) => React.createElement(Text, {
  fontFamily: "menlo",
  fontSize: 3
}, children);

const CTA = () => React.createElement(Box, null, React.createElement(Text, null));

export default (() => React.createElement(React.Fragment, null, React.createElement(Box, {
  p: 3,
  width: "100%"
}, React.createElement(Flex, null, React.createElement(LogoText, null, "Cloud"), React.createElement(Box, {
  sx: {
    position: 'relative'
  },
  width: "40px"
}, React.createElement(Box, {
  sx: {
    position: 'absolute',
    top: '-35px',
    left: '-4px'
  }
}, React.createElement(HeaderLogo, null))), React.createElement(LogoText, null, "Kitchens"))), React.createElement(Box, {
  bg: "muted",
  p: 4,
  pl: 3
}, React.createElement(Text, {
  color: "white",
  as: "h2"
}, "Smart Kitchens"), React.createElement(Text, {
  color: "white",
  as: "p"
}, "Commercial kitchens optimized for delivery"))));