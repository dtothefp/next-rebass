import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n  width: 100px;\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

import React from "react";
import { Box } from 'rebass';
import icons from '@css/icons';
import styled from '@emotion/styled';
const HeaderLogo = styled(icons.logo)(_templateObject());
export default (() => React.createElement(Box, {
  p: 5,
  width: "100%"
}, React.createElement(HeaderLogo, null)));